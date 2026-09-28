import {song,segments,lines,grammar,vocab,practice} from './content.mjs';
const assert=(ok,msg)=>{if(!ok)throw new Error(msg)};
assert(song.id==='anata-no-tameni','song id');
assert(segments.length===4,'expected 4 structural segments');
assert(lines.length===39,'expected L01-L39');
assert(vocab.length===44,'expected 44 vocabulary items');
assert(grammar.length===29,'expected 29 grammar nodes');
assert(practice.length===10,'expected 10 practice tasks');
const lineIds=new Set(lines.map(x=>x[0]));
assert(lineIds.size===39,'duplicate line id');
for(let i=1;i<=39;i++)assert(lineIds.has(`L${String(i).padStart(2,'0')}`),`missing L${i}`);
const grammarIds=new Set(grammar.map(x=>x[0]));
assert(grammarIds.size===grammar.length,'duplicate grammar id');
for(const [line,, ,refs] of lines)for(const id of refs)assert(grammarIds.has(id),`${line}: missing grammar ${id}`);
for(const [jp,hira,kata,romaji,pos,meaning] of vocab){assert(jp&&hira&&kata&&romaji&&pos&&meaning,`incomplete vocab ${jp}`)}
console.log(`PASS ${song.title}: ${lines.length} line positions / ${grammar.length} grammar nodes / ${vocab.length} vocab / ${practice.length} practice tasks`);
