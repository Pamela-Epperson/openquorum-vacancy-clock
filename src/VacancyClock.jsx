import { useState, useEffect, useMemo, useCallback } from "react";
import { STATE_CONFIG, STATE_META, REGION_ORDER } from "./states.config";

// ─── Coming-soon states (VacancyClock UI only) ─────────────────────────────────
// Remove a state from this list when it's added to states.config.js
// Phase 3A (added June 2026): PA, NY, NC, NJ, GA, IL
// Phase 3B (next): OH, FL, TX, CA, WA, CO, CT, OR
const COMING_SOON = {
  CA:"California", TX:"Texas", FL:"Florida",
  WA:"Washington", OH:"Ohio", CO:"Colorado", CT:"Connecticut", OR:"Oregon",
  AZ:"Arizona", MI:"Michigan", WI:"Wisconsin", TN:"Tennessee",
};

const ALL_DOMAINS = [
  {key:"all",         label:"All",         color:"#888780"},
  {key:"health",      label:"Health",      color:"#0F6E56"},
  {key:"education",   label:"Education",   color:"#185FA5"},
  {key:"equity",      label:"Equity",      color:"#534AB7"},
  {key:"environment", label:"Environment", color:"#3B6D11"},
  {key:"housing",     label:"Housing",     color:"#854F0B"},
  {key:"disability",  label:"Disability",  color:"#993556"},
  {key:"justice",     label:"Justice",     color:"#993C1D"},
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

function DaysBadge({days}){
  const s={critical:{bg:"#FCEBEB",color:"#791F1F",border:"1px solid #F09595"},warning:{bg:"#FAEEDA",color:"#633806",border:"1px solid #FAC775"},active:{bg:"#E1F5EE",color:"#085041",border:"1px solid #9FE1CB"}}[severity(days)];
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500,...s,whiteSpace:"nowrap"}}>{severity(days)==="critical"&&<span style={{fontSize:9}}>●</span>}{days.toLocaleString()} days{days>=365?` · ${(days/365).toFixed(1)}y`:""}</span>;
}

function VacancyBar({total,vacant}){
  const pct=Math.round((vacant/total)*100), c=pct>=50?"#E24B4A":pct>=30?"#EF9F27":"#1D9E75";
  return <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:4,background:"#e0e0e0",borderRadius:2,overflow:"hidden"}}><div style={{height:4,width:`${pct}%`,background:c,borderRadius:2}}/></div><span style={{fontSize:11,color:"#666",minWidth:38,textAlign:"right"}}>{vacant}/{total}</span></div>;
}

function EmbedModal({stateCode,onClose}){
  const [copied,setCopied]=useState(false);
  const code=`<script src="https://openquorum.org/widget.js"></script>\n<oq-vacancy-clock state="${stateCode.toLowerCase()}" theme="auto"></oq-vacancy-clock>`;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={onClose} aria-hidden="true">
      <div role="dialog" aria-modal="true" aria-labelledby="embed-modal-title" style={{background:"#fff",borderRadius:12,padding:"1.5rem",maxWidth:480,width:"90%"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><p id="embed-modal-title" style={{margin:0,fontSize:14,fontWeight:500}}>Embed — {STATE_CONFIG[stateCode].label}</p><button onClick={onClose} aria-label="Close embed dialog" style={{border:"none",background:"none",cursor:"pointer",fontSize:18,color:"#666"}}>×</button></div>
        <div style={{background:"#f5f5f5",borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:12,marginBottom:12,lineHeight:1.7,whiteSpace:"pre-wrap",wordBreak:"break-all"}}>{code}</div>
        <button onClick={()=>{navigator.clipboard?.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),2000)}} style={{width:"100%",padding:"8px 0",borderRadius:8,border:"1px solid #1D9E75",background:copied?"#1D9E75":"transparent",color:copied?"#fff":"#1D9E75",cursor:"pointer",fontSize:13,fontWeight:500}}>{copied?"Copied!":"Copy embed code"}</button>
      </div>
    </div>
  );
}

export default function VacancyClock(){
  const [stateCode,setStateCode]=useState(null);
  const [locStatus,setLocStatus]=useState("detecting"); // "detecting"|"detected"|"not-live"|"failed"
  const [locLabel,setLocLabel]=useState("");
  const [domain,setDomain]=useState("all");
  const [sortBy,setSortBy]=useState("days");
  const [sortDir,setSortDir]=useState("desc");
  const [showEmbed,setShowEmbed]=useState(false);
  const [showMenu,setShowMenu]=useState(false);
  const [showNote,setShowNote]=useState(false);
  const [tick,setTick]=useState(0);
  const [paused,setPaused]=useState(false);

  // IP-based geolocation — no permission prompt, no API key required
  useEffect(()=>{
    fetch("https://ipapi.co/json/")
      .then(r=>r.json())
      .then(d=>{
        const s=d.region_code;
        const regionName=d.region||"";
        if(s&&STATE_CONFIG[s]){
          setStateCode(s);
          setLocStatus("detected");
          setLocLabel(STATE_CONFIG[s].label);
        } else if(s){
          // User's state not yet live — show picker with message
          setStateCode(null);
          setLocStatus("not-live");
          setLocLabel(regionName||s);
        } else {
          setStateCode(Object.keys(STATE_CONFIG)[0]);
          setLocStatus("failed");
        }
      })
      .catch(()=>{
        setStateCode(Object.keys(STATE_CONFIG)[0]);
        setLocStatus("failed");
      });
  },[]);

  const handleStateChange=useCallback((code)=>{
    setStateCode(code);
    setLocStatus("chosen");
    setDomain("all");
    setShowMenu(false);
    setShowNote(false);
  },[]);

  useEffect(()=>{if(paused)return;const t=setInterval(()=>setTick(n=>n+1),60000);return()=>clearInterval(t);},[paused]);

  const cfg=stateCode?STATE_CONFIG[stateCode]:null;
  const enriched=useMemo(()=>cfg?cfg.boards.map(b=>({...b,days:calcDays(b.vacantSince),pct:Math.round(b.vacantSeats/b.totalSeats*100)})):[],[stateCode,tick,cfg]);
  const usedDomains=useMemo(()=>new Set(enriched.map(b=>b.domain)),[enriched]);

  const filtered=useMemo(()=>{
    const data=domain==="all"?enriched:enriched.filter(b=>b.domain===domain);
    return [...data].sort((a,b)=>{
      const av=sortBy==="name"?a.name:a[sortBy],bv=sortBy==="name"?b.name:b[sortBy];
      return typeof av==="string"?(sortDir==="asc"?av.localeCompare(bv):bv.localeCompare(av)):(sortDir==="asc"?av-bv:bv-av);
    });
  },[enriched,domain,sortBy,sortDir]);

  const totalVacant=enriched.reduce((s,b)=>s+b.vacantSeats,0);
  const totalSeats=enriched.reduce((s,b)=>s+b.totalSeats,0);
  const critical=enriched.filter(b=>b.days>=365).length;
  const avgDays=enriched.length?Math.round(enriched.reduce((s,b)=>s+b.days,0)/enriched.length):0;
  const maxDays=enriched.length?Math.max(...enriched.map(b=>b.days)):0;

  const toggleSort=col=>{if(sortBy===col)setSortDir(d=>d==="desc"?"asc":"desc");else{setSortBy(col);setSortDir("desc");}};
  const SortBtn=({col,label})=><button onClick={()=>toggleSort(col)} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,fontWeight:500,color:sortBy===col?"#1D9E75":"#666",padding:"0 2px",display:"flex",alignItems:"center",gap:3,whiteSpace:"nowrap"}}>{label}{sortBy===col?(sortDir==="desc"?" ↓":" ↑"):" ↕"}</button>;

  // Build region → states map dynamically from shared config
  const byRegion=REGION_ORDER
    .map(r=>({region:r, states:Object.entries(STATE_CONFIG).filter(([,s])=>s.region===r)}))
    .filter(({states})=>states.length>0);

  // Dropdown for state picker (shared between loading and loaded states)
  const StateMenu=()=>(
    <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:"#fff",border:"1px solid #eee",borderRadius:10,minWidth:240,zIndex:200,boxShadow:"0 4px 24px rgba(0,0,0,0.12)",overflow:"hidden",maxHeight:500,overflowY:"auto"}}>
      {byRegion.map(({region,states})=>(
        <div key={region}>
          <p style={{margin:0,padding:"8px 14px 4px",fontSize:10,color:"#767676",textTransform:"uppercase",letterSpacing:"0.08em",borderTop:region!==byRegion[0].region?"1px solid #f0f0f0":undefined}}>{region} · live data</p>
          {states.map(([code,s])=>(
            <button key={code} onClick={()=>handleStateChange(code)}
              style={{display:"block",width:"100%",textAlign:"left",padding:"8px 14px",border:"none",background:stateCode===code?"#E1F5EE":"transparent",color:stateCode===code?"#0F6E56":"#333",fontSize:13,cursor:"pointer",fontWeight:stateCode===code?600:400}}>
              {s.label}{stateCode===code?" ✓":""}
            </button>
          ))}
        </div>
      ))}
      <p style={{margin:"4px 0 0",padding:"6px 14px 4px",fontSize:10,color:"#767676",textTransform:"uppercase",letterSpacing:"0.08em",borderTop:"1px solid #f0f0f0"}}>Coming soon</p>
      {Object.entries(COMING_SOON).map(([c,n])=>(
        <div key={c} style={{padding:"5px 14px",fontSize:12,color:"#767676",display:"flex",justifyContent:"space-between"}}>
          <span>{n}</span><span style={{fontSize:10,background:"#f5f5f5",padding:"1px 6px",borderRadius:20}}>in progress</span>
        </div>
      ))}
      <div style={{padding:"8px 12px",borderTop:"1px solid #f0f0f0",marginTop:4}}>
        <button style={{width:"100%",padding:"6px 0",border:"1px dashed #1D9E75",borderRadius:8,background:"transparent",color:"#1D9E75",fontSize:12,cursor:"pointer",fontWeight:500}}>+ Request your state</button>
      </div>
    </div>
  );

  return(
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",maxWidth:1100,margin:"0 auto",padding:"0 0 2rem",color:"#1a1a1a"}} onClick={()=>showMenu&&setShowMenu(false)}>
      {showEmbed&&stateCode&&<EmbedModal stateCode={stateCode} onClose={()=>setShowEmbed(false)}/>}

      {/* Header */}
      <div style={{borderBottom:"1px solid #eee",paddingBottom:"1rem",marginBottom:"1.25rem"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4,flexWrap:"wrap"}}>
              <span style={{fontSize:20,fontWeight:600,letterSpacing:"-0.02em"}}>Open<span style={{color:"#1D9E75"}}>Quorum</span></span>

              {/* State picker — shows location state or manual picker */}
              <div style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
                {locStatus==="detecting"?(
                  <span style={{fontSize:12,color:"#767676",padding:"4px 10px",borderRadius:20,border:"1.5px solid #eee",display:"inline-flex",alignItems:"center",gap:6}}>
                    <span style={{width:8,height:8,border:"1.5px solid #aaa",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block",animation:"spin 0.8s linear infinite"}}/>
                    Detecting location…
                  </span>
                ):(
                  <>
                    <button onClick={()=>setShowMenu(v=>!v)}
                      style={{display:"flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:20,border:"1.5px solid #1D9E75",background:"#E1F5EE",color:"#0F6E56",fontWeight:600,fontSize:12,cursor:"pointer"}}>
                      {locStatus==="detected"&&"📍 "}{cfg?cfg.label:"Choose your state"} <span style={{fontSize:10}}>▾</span>
                    </button>
                    {showMenu&&<StateMenu/>}
                  </>
                )}
              </div>

              {/* Location status badge */}
              {locStatus==="detected"&&(
                <span style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:"#E1F5EE",color:"#0F6E56"}}>
                  Location detected
                </span>
              )}
              {locStatus==="not-live"&&(
                <span style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:"#FAEEDA",color:"#633806"}}>
                  {locLabel} coming soon — choose a state below
                </span>
              )}
              <span style={{fontSize:11,padding:"3px 8px",borderRadius:20,background:"#f0f0f0",color:"#666"}}>Sample data · scraper in development</span>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}`}</style>
            </div>
            <p style={{margin:0,fontSize:12,color:"#666"}}>{cfg?`Vacancy Clock · ${cfg.dataSource}`:"Vacancy Clock · openquorum.org"}</p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {stateCode&&<button onClick={()=>setShowEmbed(true)} style={{padding:"7px 14px",borderRadius:8,border:"1px solid #1D9E75",background:"transparent",color:"#1D9E75",cursor:"pointer",fontSize:12,fontWeight:500}}>&lt;/&gt; Embed</button>}
            {cfg&&<a href={cfg.applyUrl} target="_blank" rel="noreferrer" style={{padding:"7px 14px",borderRadius:8,border:"1px solid #ddd",background:"transparent",color:"#555",fontSize:12,fontWeight:500,textDecoration:"none"}}>Apply ↗</a>}
          </div>
        </div>
      </div>

      {/* State not yet live — show picker prominently */}
      {!stateCode&&locStatus!=="detecting"&&(
        <div style={{textAlign:"center",padding:"3rem 1rem"}}>
          <p style={{fontSize:15,fontWeight:500,color:"#1a1a1a",marginBottom:8}}>
            {locStatus==="not-live"?`${locLabel} isn't live yet — pick a state to explore:`:"Choose your state to get started:"}
          </p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",maxWidth:600,margin:"0 auto"}}>
            {Object.entries(STATE_CONFIG).map(([code,s])=>(
              <button key={code} onClick={()=>handleStateChange(code)}
                style={{padding:"8px 18px",borderRadius:20,border:`1.5px solid ${s.color}`,background:s.bg,color:s.color,fontWeight:600,fontSize:13,cursor:"pointer"}}>
                {s.label}
              </button>
            ))}
          </div>
          <p style={{marginTop:"1.5rem",fontSize:12,color:"#767676"}}>More states added regularly · <span style={{color:"#1D9E75",cursor:"pointer"}}>request yours</span></p>
        </div>
      )}

      {/* Board data — only renders when a state is selected */}
      {cfg&&(<>

      {/* Context / Audit banners */}
      {(cfg.contextNote||cfg.auditNote)&&(
        <div style={{marginBottom:"1.25rem"}}>
          {cfg.contextNote&&(
            <div style={{padding:"8px 14px",borderRadius:8,background:"#E6F1FB",border:"1px solid #B5D4F4",marginBottom:6}}>
              <p style={{margin:0,fontSize:12,color:"#0C447C",lineHeight:1.7}}>ℹ️ {cfg.contextNote}</p>
            </div>
          )}
          {cfg.auditNote&&(
            <>
              <button onClick={()=>setShowNote(v=>!v)} style={{width:"100%",padding:"8px 14px",borderRadius:showNote?"8px 8px 0 0":"8px",border:"1px solid #378ADD",background:"#E6F1FB",color:"#0C447C",cursor:"pointer",fontSize:12,fontWeight:500,textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>📋 Official state audit confirms vacancy problem</span>
                <span style={{fontSize:11,fontWeight:400}}>{showNote?"hide ↑":"view source ↓"}</span>
              </button>
              {showNote&&<div style={{padding:"10px 14px",borderRadius:"0 0 8px 8px",border:"1px solid #378ADD",borderTop:"none",background:"#fff"}}><p style={{margin:0,fontSize:12,color:"#0C447C",lineHeight:1.7}}>{cfg.auditNote}</p></div>}
            </>
          )}
        </div>
      )}

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:"1.25rem"}}>
        {[
          {label:"Vacant seats",     value:totalVacant,                                  sub:`of ${totalSeats} tracked`,       accent:"#E24B4A"},
          {label:"Critical (365d+)", value:critical,                                     sub:"boards over 1 year",             accent:"#E24B4A"},
          {label:"Avg vacancy",      value:`${avgDays}d`,                                sub:`~${(avgDays/365).toFixed(1)}y`,   accent:"#EF9F27"},
          {label:"Longest",          value:`${(maxDays/365).toFixed(1)}y`,              sub:`${maxDays.toLocaleString()} days`,accent:"#E24B4A"},
          {label:"Vacancy rate",     value:`${Math.round(totalVacant/totalSeats*100)}%`, sub:cfg.totalBoardsNote,              accent:"#EF9F27"},
        ].map(s=>(
          <div key={s.label} style={{background:"#f8f8f7",borderRadius:8,padding:"0.85rem 1rem"}}>
            <p style={{margin:"0 0 3px",fontSize:11,color:"#666",textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.label}</p>
            <p style={{margin:"0 0 2px",fontSize:20,fontWeight:600,color:s.accent,letterSpacing:"-0.02em"}}>{s.value}</p>
            <p style={{margin:0,fontSize:11,color:"#767676"}}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Domain filters */}
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:"1rem"}}>
        {ALL_DOMAINS.filter(d=>d.key==="all"||usedDomains.has(d.key)).map(d=>(
          <button key={d.key} onClick={()=>setDomain(d.key)} style={{padding:"4px 11px",borderRadius:20,border:domain===d.key?`1.5px solid ${d.color}`:"1px solid #e0e0e0",background:domain===d.key?d.color:"transparent",color:domain===d.key?"#fff":"#555",cursor:"pointer",fontSize:11,fontWeight:500,transition:"all 0.12s"}}>
            {d.label}{d.key!=="all"&&<span style={{marginLeft:4,fontSize:10,opacity:0.85}}>({enriched.filter(b=>b.domain===d.key).reduce((s,b)=>s+b.vacantSeats,0)})</span>}
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:"0.75rem",paddingBottom:"0.5rem",borderBottom:"1px solid #f0f0f0"}}>
        <span style={{fontSize:11,color:"#767676",textTransform:"uppercase",letterSpacing:"0.06em"}}>Sort</span>
        <SortBtn col="days" label="Days vacant"/>
        <SortBtn col="pct"  label="% unfilled"/>
        <SortBtn col="name" label="Board name"/>
        <span style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:10}}>
          <button
            onClick={()=>setPaused(p=>!p)}
            aria-label={paused?"Resume live day counter updates":"Pause live day counter updates"}
            title={paused?"Resume live updates":"Pause live updates"}
            style={{padding:"2px 9px",borderRadius:20,border:"1px solid #ddd",background:paused?"#f5f5f5":"transparent",color:"#666",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",gap:4,fontFamily:"inherit"}}>
            {paused?"▶ Resume":"⏸ Pause"}
          </button>
          <span style={{fontSize:11,color:"#767676"}}>{filtered.length} boards</span>
        </span>
      </div>

      {/* Board rows */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(b=>{
          const ds=DOMAIN_STYLES[b.domain]||{bg:"#f0f0f0",color:"#555"};
          const sev=severity(b.days);
          const lb=sev==="critical"?"3px solid #E24B4A":sev==="warning"?"3px solid #EF9F27":"3px solid #1D9E75";
          return(
            <div key={b.id} style={{border:"1px solid #eee",borderLeft:lb,borderRadius:"0 10px 10px 0",padding:"0.9rem 1rem",background:"#fff"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.06)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:12,alignItems:"start"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:4}}>
                    <span style={{fontSize:13,fontWeight:600,lineHeight:1.3}}>{b.name}</span>
                    <span style={{fontSize:10,padding:"2px 7px",borderRadius:20,...ds,fontWeight:500,whiteSpace:"nowrap"}}>{b.domain}</span>
                    {b.criticalNote&&<span style={{fontSize:10,color:"#A32D2D",background:"#FCEBEB",padding:"2px 7px",borderRadius:20}}>{b.criticalNote}</span>}
                  </div>
                  <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                    <span style={{fontSize:11,color:"#666"}}>Authority: <strong style={{color:"#555",fontWeight:500}}>{b.authority}</strong></span>
                    <span style={{fontSize:11,color:"#666"}}>Serves: <strong style={{color:"#555",fontWeight:500}}>{b.constituent}</strong></span>
                  </div>
                  <div style={{marginTop:8,maxWidth:200}}><VacancyBar total={b.totalSeats} vacant={b.vacantSeats}/></div>
                </div>
                <div style={{textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                  <DaysBadge days={b.days}/>
                  <span style={{fontSize:10,color:"#767676"}}>since {new Date(b.vacantSince).toLocaleDateString("en-US",{month:"short",year:"numeric"})}</span>
                  <a href={cfg.applyUrl} target="_blank" rel="noreferrer" style={{fontSize:11,color:"#1D9E75",textDecoration:"none",fontWeight:500}}>Apply →</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{marginTop:"1.5rem",paddingTop:"1rem",borderTop:"1px solid #f0f0f0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <p style={{margin:0,fontSize:11,color:"#767676"}}>Data: <a href={`https://${cfg.dataSource}`} style={{color:"#1D9E75",textDecoration:"none"}}>{cfg.dataSource}</a> · <a href={cfg.applyUrl} style={{color:"#1D9E75",textDecoration:"none"}}>{cfg.applyLabel}</a> · <a href="https://github.com/openquorum" style={{color:"#1D9E75",textDecoration:"none"}}>GitHub</a></p>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setShowEmbed(true)} style={{padding:"5px 12px",borderRadius:8,border:"1px solid #ddd",background:"transparent",color:"#666",cursor:"pointer",fontSize:11}}>Embed</button>
          <button onClick={()=>navigator.clipboard?.writeText(`${cfg.label} has ${totalVacant} unfilled state board seats — some vacant for over ${(maxDays/365).toFixed(1)} years. Track at openquorum.org`)} style={{padding:"5px 12px",borderRadius:8,border:"1px solid #1D9E75",background:"transparent",color:"#1D9E75",cursor:"pointer",fontSize:11,fontWeight:500}}>Share data</button>
        </div>
      </div>
      </>)}
    </div>
  );
}
