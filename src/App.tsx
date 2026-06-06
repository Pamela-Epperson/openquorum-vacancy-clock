// @ts-nocheck
import { useState, useEffect, useMemo } from "react";
import { STATE_CONFIG, REGION_ORDER } from "./states.config.js";

// ─── State name → code (for geolocation reverse lookup) ───────────────────────
const NAME_TO_CODE = {
  "Maryland":"MD","Minnesota":"MN","Massachusetts":"MA","Virginia":"VA",
  "District of Columbia":"DC","Delaware":"DE","Pennsylvania":"PA",
  "New York":"NY","North Carolina":"NC","New Jersey":"NJ",
  "Georgia":"GA","Illinois":"IL",
};

// States not yet in config — shown as "coming soon"
const COMING_SOON = {
  CA:"California",TX:"Texas",FL:"Florida",WA:"Washington",
  OH:"Ohio",AZ:"Arizona",CO:"Colorado",MI:"Michigan",TN:"Tennessee",WI:"Wisconsin",
};

const ALL_DOMAINS = [
  {key:"all",        label:"All domains",            color:"#888780"},
  {key:"health",     label:"Health",                 color:"#0F6E56"},
  {key:"education",  label:"Education",              color:"#185FA5"},
  {key:"equity",     label:"Equity & representation",color:"#534AB7"},
  {key:"environment",label:"Environment",            color:"#3B6D11"},
  {key:"housing",    label:"Housing",                color:"#854F0B"},
  {key:"disability", label:"Disability services",    color:"#993556"},
  {key:"justice",    label:"Justice",                color:"#993C1D"},
];

const DOMAIN_STYLES = {
  health:      {bg:"#E1F5EE",color:"#085041"},
  education:   {bg:"#E6F1FB",color:"#0C447C"},
  equity:      {bg:"#EEEDFE",color:"#3C3489"},
  environment: {bg:"#EAF3DE",color:"#27500A"},
  housing:     {bg:"#FAEEDA",color:"#633806"},
  disability:  {bg:"#FBEAF0",color:"#72243E"},
  justice:     {bg:"#FAECE7",color:"#712B13"},
};

const calcDays = d => Math.floor((new Date()-new Date(d))/86400000);
const severity = d => d>=365?"critical":d>=180?"warning":"active";

// ─── Sub-components ────────────────────────────────────────────────────────────
function DaysBadge({days}) {
  const sev=severity(days);
  const s={critical:{bg:"#FCEBEB",color:"#791F1F",border:"1px solid #F09595"},warning:{bg:"#FAEEDA",color:"#633806",border:"1px solid #FAC775"},active:{bg:"#E1F5EE",color:"#085041",border:"1px solid #9FE1CB"}}[sev];
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,...s,whiteSpace:"nowrap"}}>
      {sev==="critical"&&<span style={{fontSize:9}}>●</span>}
      {days.toLocaleString()} days{days>=365?` · ${(days/365).toFixed(1)}y`:""}
    </span>
  );
}

function VacancyBar({total,vacant}) {
  const pct=Math.round((vacant/total)*100), c=pct>=50?"#E24B4A":pct>=30?"#EF9F27":"#1D9E75";
  return(
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{flex:1,height:4,background:"#e0e0e0",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:4,width:`${pct}%`,background:c,borderRadius:2}}/>
      </div>
      <span style={{fontSize:11,color:"#888",minWidth:38,textAlign:"right"}}>{vacant}/{total}</span>
    </div>
  );
}

function EmbedModal({stateCode,onClose}) {
  const [copied,setCopied]=useState(false);
  const code=`<script src="https://openquorum.org/widget.js"></script>\n<oq-vacancy-clock state="${stateCode.toLowerCase()}" theme="auto"></oq-vacancy-clock>`;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:12,padding:"1.5rem",maxWidth:480,width:"90%"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <p style={{margin:0,fontSize:14,fontWeight:500}}>Embed Vacancy Clock — {STATE_CONFIG[stateCode]?.label}</p>
          <button onClick={onClose} style={{border:"none",background:"none",cursor:"pointer",fontSize:18,color:"#888"}}>×</button>
        </div>
        <p style={{fontSize:12,color:"#666",margin:"0 0 10px",lineHeight:1.6}}>Two lines. Any website. No contract, no login required.</p>
        <div style={{background:"#f5f5f5",borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:12,marginBottom:12,lineHeight:1.7,whiteSpace:"pre-wrap",wordBreak:"break-all"}}>{code}</div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{navigator.clipboard?.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),2000)}}
            style={{flex:1,padding:"8px 0",borderRadius:8,border:"1px solid #1D9E75",background:copied?"#1D9E75":"transparent",color:copied?"#fff":"#1D9E75",cursor:"pointer",fontSize:13,fontWeight:500}}>
            {copied?"Copied!":"Copy embed code"}
          </button>
          <button onClick={onClose} style={{padding:"8px 16px",borderRadius:8,border:"1px solid #ddd",background:"transparent",color:"#666",cursor:"pointer",fontSize:13}}>Close</button>
        </div>
      </div>
    </div>
  );
}

function RequestStateModal({onClose}) {
  const [stateName,setStateName]=useState("");
  const [email,setEmail]=useState("");
  const [submitted,setSubmitted]=useState(false);

  const handleSubmit=()=>{
    if(!stateName.trim()) return;
    // Store request locally and show confirmation
    const requests=JSON.parse(localStorage.getItem("oq_state_requests")||"[]");
    requests.push({state:stateName.trim(),email:email.trim(),date:new Date().toISOString()});
    localStorage.setItem("oq_state_requests",JSON.stringify(requests));
    setSubmitted(true);
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:12,padding:"1.5rem",maxWidth:440,width:"100%"}} onClick={e=>e.stopPropagation()}>
        {submitted?(
          <>
            <div style={{textAlign:"center",padding:"1rem 0"}}>
              <div style={{fontSize:36,marginBottom:12}}>🎉</div>
              <p style={{margin:"0 0 6px",fontSize:16,fontWeight:500,color:"#1a1a1a"}}>Request received!</p>
              <p style={{margin:"0 0 16px",fontSize:13,color:"#666",lineHeight:1.6}}><strong>{stateName}</strong> is now in our queue. We'll add board data for your state and notify you when it's live.</p>
              <p style={{margin:0,fontSize:12,color:"#888"}}>Already have board data for your state? Contribute at <a href="https://github.com/openquorum" style={{color:"#1D9E75"}}>github.com/openquorum</a></p>
            </div>
            <button onClick={onClose} style={{width:"100%",marginTop:16,padding:"9px 0",borderRadius:8,border:"none",background:"#1D9E75",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:500}}>Done</button>
          </>
        ):(
          <>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
              <p style={{margin:0,fontSize:14,fontWeight:500}}>Request your state</p>
              <button onClick={onClose} style={{border:"none",background:"none",cursor:"pointer",fontSize:18,color:"#888"}}>×</button>
            </div>
            <p style={{fontSize:12,color:"#666",margin:"0 0 14px",lineHeight:1.6}}>Your state isn't in OpenQuorum yet — but it should be. Tell us where you're from and we'll add board vacancy data for your state in the next expansion wave.</p>
            <div style={{marginBottom:10}}>
              <label style={{fontSize:11,color:"#888",display:"block",marginBottom:4}}>Your state *</label>
              <input value={stateName} onChange={e=>setStateName(e.target.value)} placeholder="e.g. California, Texas, Ohio..."
                style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid #ddd",fontSize:13,boxSizing:"border-box",outline:"none"}}/>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,color:"#888",display:"block",marginBottom:4}}>Your email (optional — to be notified when we launch)</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" type="email"
                style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid #ddd",fontSize:13,boxSizing:"border-box",outline:"none"}}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={handleSubmit} disabled={!stateName.trim()}
                style={{flex:1,padding:"9px 0",borderRadius:8,border:"none",background:stateName.trim()?"#1D9E75":"#ddd",color:stateName.trim()?"#fff":"#aaa",cursor:stateName.trim()?"pointer":"not-allowed",fontSize:13,fontWeight:500}}>
                Submit request
              </button>
              <button onClick={onClose} style={{padding:"9px 16px",borderRadius:8,border:"1px solid #ddd",background:"transparent",color:"#666",cursor:"pointer",fontSize:13}}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function VacancyClock() {
  const [stateCode,setStateCode]  = useState("MD");
  const [geoState,setGeoState]    = useState(null); // detected state code
  const [geoLoading,setGeoLoading]= useState(true);
  const [domain,setDomain]        = useState("all");
  const [sortBy,setSortBy]        = useState("days");
  const [sortDir,setSortDir]      = useState("desc");
  const [showEmbed,setShowEmbed]  = useState(false);
  const [showMenu,setShowMenu]    = useState(false);
  const [showRequest,setShowRequest]=useState(false);
  const [showNote,setShowNote]    = useState(false);
  const [tick,setTick]            = useState(0);

  // Auto-tick every minute so day counters stay live
  useEffect(()=>{const t=setInterval(()=>setTick(n=>n+1),60000);return()=>clearInterval(t);},[]);

  // Geolocation on mount — detect user's state and default to it
  useEffect(()=>{
    if(!navigator.geolocation){ setGeoLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      async pos=>{
        try{
          const {latitude:lat,longitude:lon}=pos.coords;
          const res=await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            {headers:{"Accept-Language":"en","User-Agent":"OpenQuorum/1.0"}}
          );
          const data=await res.json();
          const detected=NAME_TO_CODE[data.address?.state];
          if(detected&&STATE_CONFIG[detected]){
            setGeoState(detected);
            setStateCode(detected);
          }
        }catch(e){}
        setGeoLoading(false);
      },
      ()=>setGeoLoading(false),
      {timeout:6000}
    );
  },[]);

  const cfg=STATE_CONFIG[stateCode]||Object.values(STATE_CONFIG)[0];
  const enriched=useMemo(()=>cfg.boards.map(b=>({...b,days:calcDays(b.vacantSince),pct:Math.round(b.vacantSeats/b.totalSeats*100)})),[stateCode,tick]);
  const usedDomains=useMemo(()=>new Set(enriched.map(b=>b.domain)),[enriched]);

  const filtered=useMemo(()=>{
    const data=domain==="all"?enriched:enriched.filter(b=>b.domain===domain);
    return [...data].sort((a,b)=>{
      const av=sortBy==="name"?a.name:a[sortBy],bv=sortBy==="name"?b.name:b[sortBy];
      return typeof av==="string"?(sortDir==="asc"?av.localeCompare(bv):bv.localeCompare(av)):(sortDir==="asc"?av-bv:bv-av);
    });
  },[enriched,domain,sortBy,sortDir]);

  const totalVacant=enriched.reduce((s,b)=>s+b.vacantSeats,0);
  const totalSeats =enriched.reduce((s,b)=>s+b.totalSeats,0);
  const critical   =enriched.filter(b=>b.days>=365).length;
  const avgDays    =Math.round(enriched.reduce((s,b)=>s+b.days,0)/Math.max(enriched.length,1));
  const maxDays    =Math.max(...enriched.map(b=>b.days),0);

  const toggleSort=col=>{if(sortBy===col)setSortDir(d=>d==="desc"?"asc":"desc");else{setSortBy(col);setSortDir("desc");}};
  const SortBtn=({col,label})=>(
    <button onClick={()=>toggleSort(col)} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,fontWeight:500,color:sortBy===col?"#1D9E75":"#888",padding:"0 2px",display:"flex",alignItems:"center",gap:3,whiteSpace:"nowrap"}}>
      {label}{sortBy===col?(sortDir==="desc"?" ↓":" ↑"):" ↕"}
    </button>
  );

  // Group live states by region for the dropdown
  const byRegion=useMemo(()=>
    REGION_ORDER
      .map(r=>({region:r,states:Object.entries(STATE_CONFIG).filter(([,s])=>s.region===r)}))
      .filter(g=>g.states.length>0),
    []
  );

  return(
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",maxWidth:1100,margin:"0 auto",padding:"0 0 2rem",color:"#1a1a1a"}}
      onClick={()=>showMenu&&setShowMenu(false)}>

      {showEmbed  &&<EmbedModal stateCode={stateCode} onClose={()=>setShowEmbed(false)}/>}
      {showRequest&&<RequestStateModal onClose={()=>setShowRequest(false)}/>}

      {/* Header */}
      <div style={{borderBottom:"1px solid #eee",paddingBottom:"1rem",marginBottom:"1.25rem"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4,flexWrap:"wrap"}}>
              <span style={{fontSize:20,fontWeight:600,letterSpacing:"-0.02em"}}>Open<span style={{color:"#1D9E75"}}>Quorum</span></span>

              {/* State picker */}
              <div style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
                <button onClick={()=>setShowMenu(v=>!v)}
                  style={{display:"flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:20,border:"1.5px solid #1D9E75",background:"#E1F5EE",color:"#0F6E56",fontWeight:600,fontSize:12,cursor:"pointer"}}>
                  {cfg.label}
                  {geoState===stateCode&&!geoLoading&&<span style={{fontSize:9,opacity:0.7}}>📍</span>}
                  <span style={{fontSize:10}}>▾</span>
                </button>

                {showMenu&&(
                  <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:"#fff",border:"1px solid #eee",borderRadius:10,minWidth:240,zIndex:200,boxShadow:"0 4px 24px rgba(0,0,0,0.12)",overflow:"hidden",maxHeight:520,overflowY:"auto"}}>
                    {byRegion.map(({region,states})=>(
                      <div key={region}>
                        <p style={{margin:0,padding:"8px 14px 4px",fontSize:10,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.08em",borderTop:region!==byRegion[0].region?"1px solid #f0f0f0":undefined}}>
                          {region} · live data
                        </p>
                        {states.map(([code,s])=>(
                          <button key={code} onClick={()=>{setStateCode(code);setDomain("all");setShowMenu(false);setShowNote(false);}}
                            style={{display:"flex",alignItems:"center",gap:6,width:"100%",textAlign:"left",padding:"8px 14px",border:"none",
                              background:stateCode===code?"#E1F5EE":"transparent",
                              color:stateCode===code?"#0F6E56":"#333",fontSize:13,cursor:"pointer",fontWeight:stateCode===code?600:400}}>
                            {s.label}
                            {geoState===code&&<span style={{fontSize:9,marginLeft:"auto",color:"#1D9E75"}}>📍 your location</span>}
                            {stateCode===code&&geoState!==code&&<span style={{marginLeft:"auto",color:"#1D9E75",fontSize:12}}>✓</span>}
                          </button>
                        ))}
                      </div>
                    ))}

                    {/* Coming soon */}
                    <p style={{margin:"4px 0 0",padding:"6px 14px 4px",fontSize:10,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.08em",borderTop:"1px solid #f0f0f0"}}>Coming soon</p>
                    {Object.entries(COMING_SOON).map(([c,n])=>(
                      <div key={c} style={{padding:"5px 14px",fontSize:12,color:"#bbb",display:"flex",justifyContent:"space-between"}}>
                        <span>{n}</span><span style={{fontSize:10,background:"#f5f5f5",padding:"1px 6px",borderRadius:20}}>in progress</span>
                      </div>
                    ))}

                    {/* Request state button */}
                    <div style={{padding:"8px 12px",borderTop:"1px solid #f0f0f0",marginTop:4}}>
                      <button onClick={()=>{setShowMenu(false);setShowRequest(true);}}
                        style={{width:"100%",padding:"8px 0",border:"1px dashed #1D9E75",borderRadius:8,background:"transparent",color:"#1D9E75",fontSize:12,cursor:"pointer",fontWeight:500}}>
                        + Request your state →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {geoLoading&&<span style={{fontSize:11,color:"#aaa"}}>📍 Detecting location…</span>}
              <span style={{fontSize:11,padding:"3px 8px",borderRadius:20,background:"#f0f0f0",color:"#999"}}>Sample data · scraper in dev</span>
            </div>
            <p style={{margin:0,fontSize:12,color:"#888"}}>Vacancy Clock · {cfg.dataSource}</p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button onClick={()=>setShowEmbed(true)} style={{padding:"7px 14px",borderRadius:8,border:"1px solid #1D9E75",background:"transparent",color:"#1D9E75",cursor:"pointer",fontSize:12,fontWeight:500}}>&lt;/&gt; Embed</button>
            <a href={cfg.applyUrl} target="_blank" rel="noreferrer" style={{padding:"7px 14px",borderRadius:8,border:"1px solid #ddd",background:"transparent",color:"#555",fontSize:12,fontWeight:500,textDecoration:"none"}}>Apply ↗</a>
          </div>
        </div>
      </div>

      {/* Context / audit banners */}
      {(cfg.contextNote||cfg.auditNote)&&(
        <div style={{marginBottom:"1.25rem"}}>
          {cfg.contextNote&&<div style={{padding:"8px 14px",borderRadius:8,background:"#E6F1FB",border:"1px solid #B5D4F4",marginBottom:6}}>
            <p style={{margin:0,fontSize:12,color:"#0C447C",lineHeight:1.7}}>ℹ️ {cfg.contextNote}</p>
          </div>}
          {cfg.auditNote&&<>
            <button onClick={()=>setShowNote(v=>!v)} style={{width:"100%",padding:"8px 14px",borderRadius:showNote?"8px 8px 0 0":"8px",border:"1px solid #378ADD",background:"#E6F1FB",color:"#0C447C",cursor:"pointer",fontSize:12,fontWeight:500,textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span>📋 Official state audit confirms vacancy problem</span>
              <span style={{fontSize:11,fontWeight:400}}>{showNote?"hide ↑":"view source ↓"}</span>
            </button>
            {showNote&&<div style={{padding:"10px 14px",borderRadius:"0 0 8px 8px",border:"1px solid #378ADD",borderTop:"none",background:"#fff"}}>
              <p style={{margin:0,fontSize:12,color:"#0C447C",lineHeight:1.7}}>{cfg.auditNote}</p>
            </div>}
          </>}
        </div>
      )}

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:"1.25rem"}}>
        {[
          {label:"Vacant seats",     value:totalVacant,                                   sub:`of ${totalSeats} tracked`,        accent:"#E24B4A"},
          {label:"Critical (365d+)", value:critical,                                      sub:"boards over 1 year",              accent:"#E24B4A"},
          {label:"Avg vacancy",      value:`${avgDays}d`,                                 sub:`~${(avgDays/365).toFixed(1)}y`,    accent:"#EF9F27"},
          {label:"Longest vacancy",  value:`${(maxDays/365).toFixed(1)}y`,               sub:`${maxDays.toLocaleString()} days`, accent:"#E24B4A"},
          {label:"Vacancy rate",     value:`${Math.round(totalVacant/Math.max(totalSeats,1)*100)}%`,sub:cfg.totalBoardsNote,  accent:"#EF9F27"},
        ].map(s=>(
          <div key={s.label} style={{background:"#f8f8f7",borderRadius:8,padding:"0.85rem 1rem"}}>
            <p style={{margin:"0 0 3px",fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.label}</p>
            <p style={{margin:"0 0 2px",fontSize:20,fontWeight:600,color:s.accent,letterSpacing:"-0.02em"}}>{s.value}</p>
            <p style={{margin:0,fontSize:11,color:"#aaa"}}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Domain filters */}
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:"1rem"}}>
        {ALL_DOMAINS.filter(d=>d.key==="all"||usedDomains.has(d.key)).map(d=>(
          <button key={d.key} onClick={()=>setDomain(d.key)}
            style={{padding:"5px 12px",borderRadius:20,border:domain===d.key?`1.5px solid ${d.color}`:"1px solid #e0e0e0",background:domain===d.key?d.color:"transparent",color:domain===d.key?"#fff":"#555",cursor:"pointer",fontSize:12,fontWeight:500,transition:"all 0.12s"}}>
            {d.label}
            {d.key!=="all"&&<span style={{marginLeft:5,fontSize:11,opacity:0.85}}>({enriched.filter(b=>b.domain===d.key).reduce((s,b)=>s+b.vacantSeats,0)})</span>}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:"0.75rem",paddingBottom:"0.5rem",borderBottom:"1px solid #f0f0f0"}}>
        <span style={{fontSize:11,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.06em"}}>Sort</span>
        <SortBtn col="days" label="Days vacant"/>
        <SortBtn col="pct"  label="% unfilled"/>
        <SortBtn col="name" label="Board name"/>
        <span style={{marginLeft:"auto",fontSize:11,color:"#aaa"}}>{filtered.length} boards</span>
      </div>

      {/* Board rows */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(b=>{
          const ds=DOMAIN_STYLES[b.domain]||{bg:"#f0f0f0",color:"#555"};
          const sev=severity(b.days);
          const lb=sev==="critical"?"3px solid #E24B4A":sev==="warning"?"3px solid #EF9F27":"3px solid #1D9E75";
          return(
            <div key={b.id} style={{border:"1px solid #eee",borderLeft:lb,borderRadius:"0 10px 10px 0",padding:"0.9rem 1rem",background:"#fff"}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.06)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:12,alignItems:"start"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:4}}>
                    <span style={{fontSize:13,fontWeight:600,lineHeight:1.3}}>{b.name}</span>
                    <span style={{fontSize:10,padding:"2px 7px",borderRadius:20,...ds,fontWeight:500,whiteSpace:"nowrap"}}>{b.domain}</span>
                    {b.criticalNote&&<span style={{fontSize:10,color:"#A32D2D",background:"#FCEBEB",padding:"2px 7px",borderRadius:20}}>{b.criticalNote}</span>}
                  </div>
                  <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                    <span style={{fontSize:11,color:"#888"}}>Authority: <strong style={{color:"#555",fontWeight:500}}>{b.authority}</strong></span>
                    <span style={{fontSize:11,color:"#888"}}>Serves: <strong style={{color:"#555",fontWeight:500}}>{b.constituent}</strong></span>
                  </div>
                  <div style={{marginTop:8,maxWidth:200}}><VacancyBar total={b.totalSeats} vacant={b.vacantSeats}/></div>
                </div>
                <div style={{textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                  <DaysBadge days={b.days}/>
                  <span style={{fontSize:10,color:"#bbb"}}>since {new Date(b.vacantSince).toLocaleDateString("en-US",{month:"short",year:"numeric"})}</span>
                  <a href={cfg.applyUrl} target="_blank" rel="noreferrer" style={{fontSize:11,color:"#1D9E75",textDecoration:"none",fontWeight:500}}>Apply →</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{marginTop:"1.5rem",paddingTop:"1rem",borderTop:"1px solid #f0f0f0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <p style={{margin:0,fontSize:11,color:"#bbb",lineHeight:1.6}}>
          Data: <a href={`https://${cfg.dataSource}`} style={{color:"#1D9E75",textDecoration:"none"}}>{cfg.dataSource}</a> · Apply: <a href={cfg.applyUrl} style={{color:"#1D9E75",textDecoration:"none"}}>{cfg.applyLabel}</a> · <a href="https://github.com/Pamela-Epperson" style={{color:"#1D9E75",textDecoration:"none"}}>GitHub</a>
        </p>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setShowEmbed(true)} style={{padding:"5px 12px",borderRadius:8,border:"1px solid #ddd",background:"transparent",color:"#888",cursor:"pointer",fontSize:11}}>Embed</button>
          <button onClick={()=>navigator.clipboard?.writeText(`${cfg.label} has ${totalVacant} unfilled state board seats — some vacant for over ${(maxDays/365).toFixed(1)} years. Track at openquorum-vacancy-clock.vercel.app`)}
            style={{padding:"5px 12px",borderRadius:8,border:"1px solid #1D9E75",background:"transparent",color:"#1D9E75",cursor:"pointer",fontSize:11,fontWeight:500}}>
            Share data
          </button>
        </div>
      </div>
    </div>
  );
}
