import os
import requests
import pandas as pd

def check_gamer_3293():
    stock_id = "3293"
    url = f"https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockFinancialStatements&data_id={stock_id}&start_date=2024-01-01"
    
    res = requests.get(url)
    data = res.json().get("data", [])
    
    if not data:
        print("未抓取到財報數據")
        return

    df = pd.DataFrame(data)
    
    # 篩選營業現金流與資本支出
    ocf_df = df[df['type'].isin(["OperatingCashFlows", "CashFlowsFromOperatingActivities"])].copy()
    
    if ocf_df.empty:
        print("未尋獲現金流量相關欄位")
        return
        
    ocf_df = ocf_df.sort_values(by="date")
    latest_row = ocf_df.iloc[-1]
    prev_row = ocf_df.iloc[-2]
    
    latest_ocf = latest_row['value']
    prev_ocf = prev_row['value']
    date_latest = latest_row['date']
    date_prev = prev_row['date']
    
    qoq_change = ((latest_ocf - prev_ocf) / abs(prev_ocf)) * 100 if prev_ocf != 0 else 0
    
    print(f"[{date_latest}] 鈊象(3293) 營業現金流: {latest_ocf / 1e8:.2f} 億 | QoQ: {qoq_change:.2f}%")
    
    # 警報邏輯：若營業現金流下滑幅度 > 15%
    if qoq_change < -15 or latest_ocf < 0:
        alert_msg = f"⚠️ [警報] 鈊象(3293) 營業現金流結構性下滑！\n最新季度: {date_latest}\n營業現金流: {latest_ocf / 1e8:.2f}億 (QoQ {qoq_change:.2f}%)"
        print(alert_msg)
        # 可在 GitHub Secrets 中配置 TELEGRAM_BOT_TOKEN 進行 Telegram 送訊通知
        send_telegram_alert(alert_msg)

def send_telegram_alert(msg):
    token = os.environ.get("TG_BOT_TOKEN")
    chat_id = os.environ.get("TG_CHAT_ID")
    if token and chat_id:
        tg_url = f"https://api.telegram.org/bot{token}/sendMessage"
        requests.post(tg_url, data={"chat_id": chat_id, "text": msg})

if __name__ == "__main__":
    check_gamer_3293()
