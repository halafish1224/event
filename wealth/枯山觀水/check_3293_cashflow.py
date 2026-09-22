import streamlit as st
import requests
import pandas as pd
import plotly.express as px

# 1. 設定頁面標題與佈局
st.set_page_config(page_title="鈊象 (3293) FCF 戰情儀表板", layout="wide")

st.title("🎮 鈊象 (3293) 自由現金流與營業現金流監測雷達")
st.caption("數據來源：FinMind API | 自動化財報與 PDCA 檢核系統")

# 2. 獲取財務數據
@st.cache_data(ttl=3600)
def fetch_financial_data():
    stock_id = "3293"
    url = f"https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockFinancialStatements&data_id={stock_id}&start_date=2023-01-01"
    try:
        res = requests.get(url)
        data = res.json().get("data", [])
        return pd.DataFrame(data)
    except Exception as e:
        st.error(f"數據抓取失敗: {e}")
        return pd.DataFrame()

df = fetch_financial_data()

if not df.empty:
    # 過濾營業現金流 (OCF) 與資本支出 (Capex)
    ocf_df = df[df['type'].isin(["OperatingCashFlows", "CashFlowsFromOperatingActivities"])].copy()
    capex_df = df[df['type'].isin(["CapitalExpenditures", "PropertyPlantAndEquipment"])].copy()
    
    if not ocf_df.empty:
        ocf_df = ocf_df.sort_values(by="date")
        latest_row = ocf_df.iloc[-1]
        prev_row = ocf_df.iloc[-2] if len(ocf_df) > 1 else latest_row
        
        latest_ocf = latest_row['value'] / 1e8
        prev_ocf = prev_row['value'] / 1e8
        qoq_change = ((latest_ocf - prev_ocf) / abs(prev_ocf)) * 100 if prev_ocf != 0 else 0
        
        # 3. 呈現頂部關鍵指標 (KPI)
        col1, col2, col3 = st.columns(3)
        col1.metric("最新財報季度", latest_row['date'])
        col2.metric("最新營業現金流 (億)", f"${latest_ocf:.2f} 億", f"{qoq_change:+.2f}% QoQ")
        
        if qoq_change < -15 or latest_ocf < 0:
            col3.error("⚠️ 狀態：觸發結構性衰退警報")
        else:
            col3.success("🟢 狀態：現金流結構健康")

        # 4. 畫出現金流趨勢圖
        st.subheader("📊 營業現金流歷史季度趨勢 (億元)")
        ocf_df['value_100m'] = ocf_df['value'] / 1e8
        fig = px.bar(ocf_df, x='date', y='value_100m', title="鈊象 (3293) 季度 OCF 變化", labels={'value_100m': '億台幣', 'date': '季度'})
        st.plotly_chart(fig, use_container_width=True)

        # 5. PDCA 行動指南
        st.markdown("---")
        st.subheader("🧭 PDCA 動態執行提示")
        if qoq_change < -15:
            st.warning("【Act 執行提示】：檢視鈊象海外授權營收是否受阻。若護城河受損，請依據 20% 衛星天花板限制執行部位再平衡。")
        else:
            st.info("【Do 執行提示】：營運現金流維持階梯式高純度，繼續維持 0050 核心＋鈊象衛星複利配置。")
else:
    st.info("暫無可用的財報數據，請重新整理頁面。")
