// @ts-nocheck
import { useState, useEffect, useMemo } from "react"

// ─── State Configuration ───────────────────────────────────────────────────────
const STATE_CONFIG = {
  MD: {
    label:"Maryland", region:"Mid-Atlantic",
    applyUrl:"https://govappointments.maryland.gov",
    applyLabel:"Governor's Appointments Office",
    dataSource:"govappointments.maryland.gov",
    totalBoardsNote:"600+ boards statewide",
    contextNote:null, auditNote:null,
    boards:[
      {id:1,  name:"Citizens Advisory Board — Regional Institute for Children & Adolescents",domain:"health",    totalSeats:8,  vacantSeats:5,vacantSince:"2023-01-15",authority:"Governor (Sec. Health rec.)",    constituent:"Youth with behavioral health needs",          criticalNote:"Chair vacant · 63% unfilled"},
      {id:2,  name:"Advisory Board — Developmental Disabilities Administration",             domain:"disability",totalSeats:14, vacantSeats:6,vacantSince:"2022-08-20",authority:"Governor",                        constituent:"Marylanders with developmental disabilities", criticalNote:"Long-term vacancy · 43% unfilled"},
      {id:3,  name:"Maryland Commission for Women",                                          domain:"equity",    totalSeats:15, vacantSeats:6,vacantSince:"2023-04-10",authority:"Governor",                        constituent:"Maryland women & girls",                      criticalNote:"Policy-shaping body · 40% unfilled"},
      {id:4,  name:"State Interagency Council on Homelessness",                              domain:"housing",   totalSeats:18, vacantSeats:5,vacantSince:"2023-09-01",authority:"Governor",                        constituent:"Unhoused Marylanders",                        criticalNote:"Funding decisions delayed"},
      {id:5,  name:"Maryland Commission on African American History & Culture",              domain:"equity",    totalSeats:12, vacantSeats:4,vacantSince:"2023-10-30",authority:"Governor",                        constituent:"African American Marylanders",                criticalNote:"Heritage policy stalled"},
      {id:6,  name:"Opioid Response Advisory Council",                                       domain:"health",    totalSeats:16, vacantSeats:4,vacantSince:"2023-12-05",authority:"Governor",                        constituent:"Substance use disorder affected",             criticalNote:"Crisis response capacity reduced"},
      {id:7,  name:"Commission on Public Health — Data & IT Workgroup",                     domain:"health",    totalSeats:22, vacantSeats:6,vacantSince:"2024-03-01",authority:"Governor / Sec. Health",          constituent:"All Marylanders · public health system",      criticalNote:"Health IT modernization stalled"},
      {id:8,  name:"Environmental Justice Advisory Committee",                               domain:"environment",totalSeats:12,vacantSeats:4,vacantSince:"2024-05-14",authority:"Sec. Environment",                constituent:"Frontline & low-income communities",          criticalNote:"EJ permit reviews delayed"},
      {id:9,  name:"Maryland Health Care Commission",                                        domain:"health",    totalSeats:19, vacantSeats:4,vacantSince:"2024-02-20",authority:"Governor (Senate confirm.)",      constituent:"All Marylanders · health coverage",           criticalNote:"Rate review capacity reduced"},
      {id:10, name:"Maryland State Board of Education",                                      domain:"education", totalSeats:12, vacantSeats:2,vacantSince:"2024-06-01",authority:"Governor (Senate confirm.)",      constituent:"Maryland K–12 students & families",           criticalNote:"Policy quorum at risk"},
      {id:11, name:"Maryland Hispanic Affairs Commission",                                   domain:"equity",    totalSeats:11, vacantSeats:4,vacantSince:"2024-01-08",authority:"Governor",                        constituent:"Hispanic & Latino Marylanders",               criticalNote:""},
      {id:12, name:"Criminal Justice Information Advisory Board",                            domain:"justice",   totalSeats:16, vacantSeats:3,vacantSince:"2023-11-20",authority:"Governor",                        constituent:"Criminal justice system participants",        criticalNote:"Data governance delayed"},
      {id:13, name:"Affordable Housing Trust Fund Committee",                                domain:"housing",   totalSeats:13, vacantSeats:3,vacantSince:"2024-04-01",authority:"Governor",                        constituent:"Low-income housing applicants",               criticalNote:"Grant decisions backlogged"},
    ]
  },

  VA: {
    label:"Virginia", region:"Mid-Atlantic",
    applyUrl:"https://www.commonwealth.virginia.gov/va-government/boards-and-commissions/",
    applyLabel:"Secretary of the Commonwealth — Boards & Commissions",
    dataSource:"commonwealth.virginia.gov",
    totalBoardsNote:"300+ boards · ~900 appointments/year",
    contextNote:"Governor Abigail Spanberger took office January 17, 2026, inheriting dozens of vacancies from the Youngkin era. Spanberger made 27 board appointments on day one and has been actively filling seats since. A new Democratic administration means a fresh wave of appointment opportunities — many seats are open now that were previously stalled by partisan confirmation conflicts.",
    auditNote:null,
    boards:[
      {id:301,name:"Virginia Health Information Technology Advisory Commission",domain:"health",    totalSeats:16,vacantSeats:5,vacantSince:"2024-01-17",authority:"Governor / Sec. Health & Human Resources",constituent:"Health providers & patients statewide",         criticalNote:"Health IT interoperability standards"},
      {id:302,name:"Virginia Board for People with Disabilities",                domain:"disability",totalSeats:21,vacantSeats:6,vacantSince:"2023-09-01",authority:"Governor",                                  constituent:"850,000 Virginians with disabilities",          criticalNote:"Federal WIOA requirements"},
      {id:303,name:"Virginia Opioid Abatement Authority",                        domain:"health",    totalSeats:15,vacantSeats:4,vacantSince:"2024-02-01",authority:"Governor",                                  constituent:"Virginians affected by opioid crisis",          criticalNote:"Settlement fund disbursement delayed"},
      {id:304,name:"Virginia Board of Education",                                domain:"education", totalSeats:9, vacantSeats:3,vacantSince:"2024-01-17",authority:"Governor (Senate confirm.)",                constituent:"1.2M Virginia public school students",          criticalNote:"Post-Youngkin transition vacancies"},
      {id:305,name:"Virginia Early Childhood Advisory Council",                  domain:"education", totalSeats:20,vacantSeats:6,vacantSince:"2023-08-01",authority:"Governor",                                  constituent:"Virginia children 0–5 & families",              criticalNote:"30% unfilled · federal CCDF compliance"},
      {id:306,name:"Commission on African Americans",                            domain:"equity",    totalSeats:11,vacantSeats:4,vacantSince:"2023-06-01",authority:"Governor + Legislative",                    constituent:"1.9M African American Virginians",              criticalNote:""},
      {id:307,name:"Virginia Housing Advisory Board",                            domain:"housing",   totalSeats:13,vacantSeats:3,vacantSince:"2024-03-01",authority:"Governor",                                  constituent:"Low-income housing applicants statewide",        criticalNote:""},
      {id:308,name:"Governor's Commission on Veteran Services",                  domain:"justice",   totalSeats:14,vacantSeats:4,vacantSince:"2024-01-17",authority:"Governor",                                  constituent:"750,000+ Virginia veterans",                    criticalNote:"Transition vacancies — Jan 2026"},
      {id:309,name:"Virginia Criminal Justice Services Advisory Committee",      domain:"justice",   totalSeats:18,vacantSeats:5,vacantSince:"2023-10-01",authority:"Governor",                                  constituent:"Criminal justice system participants",           criticalNote:"Data policy delayed"},
      {id:310,name:"Virginia Health Workforce Development Authority",            domain:"health",    totalSeats:12,vacantSeats:3,vacantSince:"2024-07-01",authority:"Governor",                                  constituent:"Healthcare workforce statewide",                 criticalNote:""},
      {id:311,name:"Statewide Independent Living Council of Virginia",           domain:"disability",totalSeats:14,vacantSeats:4,vacantSince:"2024-01-15",authority:"Governor",                                  constituent:"Virginians with disabilities",                   criticalNote:""},
      {id:312,name:"Virginia Commission on Intergovernmental Cooperation",       domain:"equity",    totalSeats:12,vacantSeats:4,vacantSince:"2024-04-01",authority:"Governor",                                  constituent:"All Virginians",                                 criticalNote:"Transition vacancies"},
    ]
  },

  DC: {
    label:"Washington DC", region:"Mid-Atlantic",
    applyUrl:"https://mota.dc.gov/page/boards-commissions-and-task-forces-district-government",
    applyLabel:"MOTA — Mayor's Office of Talent & Appointments",
    dataSource:"mota.dc.gov",
    totalBoardsNote:"180+ public bodies · all 8 wards",
    contextNote:"DC's Mayor's Office of Talent and Appointments (MOTA) recruits from all eight wards. Note: Appointees must be registered DC voters. For vacancies not listed online, contact MOTA directly at (202) 727-1372. Boards are organized by Deputy Mayor cluster — search by cluster at mota.dc.gov for the most current vacancies.",
    auditNote:null,
    boards:[
      {id:401,name:"DC Health Information Exchange Policy Board",       domain:"health",    totalSeats:15,vacantSeats:5,vacantSince:"2023-07-01",authority:"Mayor (MOTA)",constituent:"All DC residents · health data systems",    criticalNote:"Health data interoperability stalled"},
      {id:402,name:"Commission on Mental Health",                       domain:"health",    totalSeats:10,vacantSeats:3,vacantSince:"2024-01-01",authority:"Mayor (MOTA)",constituent:"DC residents with mental health needs",     criticalNote:""},
      {id:403,name:"Office on Aging Advisory Committee",               domain:"health",    totalSeats:14,vacantSeats:4,vacantSince:"2023-08-01",authority:"Mayor (MOTA)",constituent:"DC residents 60+",                         criticalNote:"Elder services policy"},
      {id:404,name:"Commission on Persons with Disabilities",          domain:"disability",totalSeats:12,vacantSeats:4,vacantSince:"2023-06-01",authority:"Mayor (MOTA)",constituent:"DC residents with disabilities",            criticalNote:""},
      {id:405,name:"DC Housing Finance Agency Advisory Board",         domain:"housing",   totalSeats:11,vacantSeats:3,vacantSince:"2023-09-01",authority:"Mayor (MOTA)",constituent:"Low-income DC housing applicants",          criticalNote:"Affordable housing crisis"},
      {id:406,name:"DC Workforce Investment Council",                  domain:"education", totalSeats:22,vacantSeats:7,vacantSince:"2023-10-01",authority:"Mayor (MOTA)",constituent:"DC workforce program participants",         criticalNote:"32% unfilled · federal WIOA compliance"},
      {id:407,name:"Commission on Latino Community Development",       domain:"equity",    totalSeats:11,vacantSeats:4,vacantSince:"2023-07-01",authority:"Mayor (MOTA)",constituent:"~75,000 Hispanic/Latino DC residents",      criticalNote:"Last public meeting July 2023"},
      {id:408,name:"DC Commission for Women",                          domain:"equity",    totalSeats:15,vacantSeats:5,vacantSince:"2023-08-01",authority:"Mayor (MOTA)",constituent:"350,000+ DC women",                        criticalNote:""},
      {id:409,name:"Commission on Re-Entry & Returning Citizen Affairs",domain:"justice",  totalSeats:13,vacantSeats:4,vacantSince:"2023-05-01",authority:"Mayor (MOTA)",constituent:"Formerly incarcerated DC residents",        criticalNote:"Re-entry services policy delayed"},
      {id:410,name:"Advisory Board on DC Veterans Affairs",            domain:"justice",   totalSeats:11,vacantSeats:3,vacantSince:"2023-11-01",authority:"Mayor (MOTA)",constituent:"40,000+ DC area veterans",                 criticalNote:""},
      {id:411,name:"DC Environmental Network Advisory Board",          domain:"environment",totalSeats:12,vacantSeats:4,vacantSince:"2024-02-01",authority:"Mayor (MOTA)",constituent:"DC environmental justice communities",    criticalNote:"EJ permit policy"},
      {id:412,name:"DC State Board of Education",                      domain:"education", totalSeats:9, vacantSeats:2,vacantSince:"2024-01-01",authority:"Elected + Mayor",constituent:"92,000 DC public school students",       criticalNote:""},
    ]
  },

  DE: {
    label:"Delaware", region:"Mid-Atlantic",
    applyUrl:"https://governor.delaware.gov/boards-and-commissions/",
    applyLabel:"Governor Meyer's Boards & Commissions Portal",
    dataSource:"governor.delaware.gov",
    totalBoardsNote:"~300 boards · apply year-round",
    contextNote:"Governor Matt Meyer took office January 2025 and has been actively making appointments — multiple confirmation waves in late 2025 and new appointments announced through May 2026. Delaware accepts applications year-round regardless of whether a specific vacancy is currently posted. Apply now and you will be considered as seats open.",
    auditNote:null,
    boards:[
      {id:501,name:"Delaware Health Care Commission",                     domain:"health",    totalSeats:16,vacantSeats:4,vacantSince:"2024-03-01",authority:"Governor",              constituent:"All Delawareans · health coverage",          criticalNote:"Health spending oversight ($11.3B)"},
      {id:502,name:"Delaware Health Information Network Advisory Board",  domain:"health",    totalSeats:14,vacantSeats:4,vacantSince:"2023-09-01",authority:"Governor",              constituent:"All Delawareans · health IT",                criticalNote:"Health data exchange policy"},
      {id:503,name:"Delaware Council on Persons with Disabilities",       domain:"disability",totalSeats:15,vacantSeats:5,vacantSince:"2023-07-01",authority:"Governor",              constituent:"220,000 Delawareans with disabilities",      criticalNote:"33% unfilled"},
      {id:504,name:"Statewide Independent Living Council of Delaware",    domain:"disability",totalSeats:12,vacantSeats:4,vacantSince:"2024-01-01",authority:"Governor",              constituent:"Delawareans with disabilities",               criticalNote:""},
      {id:505,name:"Delaware Commission on Housing",                      domain:"housing",   totalSeats:13,vacantSeats:4,vacantSince:"2024-02-01",authority:"Governor",              constituent:"Low-income housing applicants",              criticalNote:""},
      {id:506,name:"Delaware State Board of Education",                   domain:"education", totalSeats:9, vacantSeats:2,vacantSince:"2024-06-01",authority:"Governor (Senate consent)",constituent:"136,000 Delaware public school students",  criticalNote:""},
      {id:507,name:"Governor's Early Childhood Development Committee",    domain:"education", totalSeats:16,vacantSeats:5,vacantSince:"2023-09-01",authority:"Governor",              constituent:"Delaware children 0–5 & families",           criticalNote:""},
      {id:508,name:"Delaware Commission on African American Affairs",     domain:"equity",    totalSeats:13,vacantSeats:4,vacantSince:"2023-05-01",authority:"Governor",              constituent:"African American Delawareans",               criticalNote:""},
      {id:509,name:"Delaware Hispanic Commission",                        domain:"equity",    totalSeats:11,vacantSeats:4,vacantSince:"2023-08-01",authority:"Governor",              constituent:"Hispanic/Latino Delawareans",                criticalNote:""},
      {id:510,name:"Criminal Justice Council",                            domain:"justice",   totalSeats:18,vacantSeats:5,vacantSince:"2023-12-01",authority:"Governor",              constituent:"Criminal justice system participants",        criticalNote:"Data governance delayed"},
      {id:511,name:"Natural Areas Advisory Council",                      domain:"environment",totalSeats:10,vacantSeats:3,vacantSince:"2023-10-01",authority:"Governor (Senate consent)",constituent:"Delaware natural area users & conservationists",criticalNote:""},
      {id:512,name:"Violence Against Women Act Advisory Council",         domain:"justice",   totalSeats:11,vacantSeats:3,vacantSince:"2023-11-01",authority:"Governor",              constituent:"Survivors of domestic violence",             criticalNote:""},
    ]
  },

  MA: {
    label:"Massachusetts", region:"Northeast",
    applyUrl:"https://boards.mass.gov/search",
    applyLabel:"Governor Healey's Appointments Portal",
    dataSource:"boards.mass.gov",
    totalBoardsNote:"700+ boards · 2,341 seats · 248 confirmed vacant (MA State Audit, 2021)",
    contextNote:null,
    auditNote:"The Massachusetts State Auditor confirmed in 2021 that 248 of 2,341 board seats had terms that ended without being refilled, and that the Governor's Boards and Commissions Office had not established a process to monitor upcoming vacancies. Source: Office of the State Auditor, mass.gov.",
    boards:[
      {id:201,name:"Health Information Technology Council",                       domain:"health",    totalSeats:18,vacantSeats:6,vacantSince:"2023-06-01",authority:"Governor / Sec. HHS",       constituent:"Health IT professionals, providers & all MA residents",   criticalNote:"Data interoperability standards delayed"},
      {id:202,name:"Digital Accessibility & Equity Governance Board",             domain:"health",    totalSeats:15,vacantSeats:5,vacantSince:"2024-01-15",authority:"Governor (EO #614)",         constituent:"Residents with disabilities · all MA digital users",      criticalNote:"EO #614 body · digital equity policy pending"},
      {id:203,name:"Massachusetts Health Policy Commission",                      domain:"health",    totalSeats:11,vacantSeats:2,vacantSince:"2025-07-01",authority:"Governor + AG",              constituent:"All Massachusetts residents · health cost control",       criticalNote:"Recently restructured · transition seats"},
      {id:204,name:"MassHealth Care Delivery Advisory Council",                   domain:"health",    totalSeats:20,vacantSeats:5,vacantSince:"2023-09-01",authority:"Sec. Health & Human Services",constituent:"2.2M MassHealth enrollees",                              criticalNote:"Medicaid delivery reform policy"},
      {id:205,name:"Governor's Special Advisory Commission on Disability Policy", domain:"disability",totalSeats:24,vacantSeats:8,vacantSince:"2025-10-14",authority:"Governor (org. recommendations)",constituent:"1.2M Massachusetts residents with disabilities",       criticalNote:"Re-established Oct 2025 · filling now"},
      {id:206,name:"Behavioral Health Advisory Council",                          domain:"health",    totalSeats:16,vacantSeats:5,vacantSince:"2024-02-01",authority:"Governor / Sec. HHS",       constituent:"Residents with mental health & SUD needs",               criticalNote:"Behavioral health crisis response policy"},
      {id:207,name:"Board of Registration in Medicine — Public Member Seats",     domain:"health",    totalSeats:17,vacantSeats:3,vacantSince:"2024-01-15",authority:"Governor",                   constituent:"Licensed physicians & patients statewide",               criticalNote:"Medical license review capacity"},
      {id:208,name:"Commission on Unlocking Housing Production",                  domain:"housing",   totalSeats:16,vacantSeats:4,vacantSince:"2024-01-29",authority:"Governor (Affordable Homes Act)",constituent:"All Massachusetts residents · housing affordability",   criticalNote:"Affordable Homes Act body"},
      {id:209,name:"Governor's Advisory Council for Refugees & Immigrants",       domain:"equity",    totalSeats:20,vacantSeats:6,vacantSince:"2023-05-01",authority:"Governor",                   constituent:"~750,000 foreign-born Massachusetts residents",          criticalNote:"43% unfilled"},
      {id:210,name:"Massachusetts Commission on Indian Affairs",                  domain:"equity",    totalSeats:9, vacantSeats:3,vacantSince:"2023-07-01",authority:"Governor",                   constituent:"Native American residents of Massachusetts",             criticalNote:"Tribal sovereignty & services"},
      {id:211,name:"Board of Elementary and Secondary Education",                 domain:"education", totalSeats:11,vacantSeats:2,vacantSince:"2024-03-01",authority:"Governor (Senate confirm.)", constituent:"900,000+ Massachusetts public school students",         criticalNote:"State education policy body"},
      {id:212,name:"Council on Aging Advisory Council",                           domain:"health",    totalSeats:14,vacantSeats:4,vacantSince:"2023-11-01",authority:"Governor",                   constituent:"1.4M Massachusetts residents 60+",                      criticalNote:"Elder services policy"},
      {id:213,name:"Criminal History Systems Board",                              domain:"justice",   totalSeats:13,vacantSeats:3,vacantSince:"2023-12-01",authority:"Governor + AG",              constituent:"All Massachusetts residents (CORI system)",             criticalNote:"CORI reform policy delayed"},
      {id:214,name:"State Ethics Commission",                                     domain:"justice",   totalSeats:5, vacantSeats:1,vacantSince:"2025-09-01",authority:"Attorney General",           constituent:"All Massachusetts residents",                            criticalNote:"AG appointment · publicly announced vacancy"},
    ]
  },

  MN: {
    label:"Minnesota", region:"Midwest",
    applyUrl:"https://commissionsandappointments.sos.mn.gov",
    applyLabel:"MN Secretary of State — Open Positions",
    dataSource:"sos.mn.gov/boards-commissions",
    totalBoardsNote:"130+ boards · ~500 seats · ~300 currently vacant",
    contextNote:null, auditNote:null,
    boards:[
      {id:101,name:"Mental Health Legislative Advisory Council",            domain:"health",    totalSeats:20,vacantSeats:11,vacantSince:"2022-11-01",authority:"Governor",             constituent:"Minnesotans with mental illness",                criticalNote:"55% unfilled · Chair vacant"},
      {id:102,name:"Council on Disability",                                 domain:"disability",totalSeats:13,vacantSeats:6, vacantSince:"2022-09-15",authority:"Governor",             constituent:"Minnesotans with disabilities",                  criticalNote:"Long-term vacancy · 46% unfilled"},
      {id:103,name:"Criminal & Juvenile Justice Information Policy Group",  domain:"justice",   totalSeats:19,vacantSeats:7, vacantSince:"2022-12-01",authority:"Legislative + Governor",constituent:"Criminal justice system participants",           criticalNote:"Data policy backlogged · 37% unfilled"},
      {id:104,name:"Water Council",                                          domain:"environment",totalSeats:18,vacantSeats:7,vacantSince:"2023-02-15",authority:"Governor + Legislative",constituent:"Water users statewide",                          criticalNote:"39% unfilled · resource policy delayed"},
      {id:105,name:"Human Rights Advisory Council",                         domain:"equity",    totalSeats:14,vacantSeats:6, vacantSince:"2023-02-01",authority:"Commissioner MDHR",    constituent:"All Minnesotans · discrimination cases",         criticalNote:"43% unfilled"},
      {id:106,name:"Housing Finance Agency Advisory Council",               domain:"housing",   totalSeats:15,vacantSeats:6, vacantSince:"2023-05-01",authority:"Governor",             constituent:"Low-income housing applicants",                  criticalNote:"Affordable housing policy delayed"},
      {id:107,name:"Child Protection Training & Certification Board",       domain:"health",    totalSeats:11,vacantSeats:5, vacantSince:"2023-07-01",authority:"Commissioner DHS",     constituent:"At-risk children statewide",                     criticalNote:"Training certification backlogged"},
      {id:108,name:"Board of Medical Practice",                             domain:"health",    totalSeats:16,vacantSeats:4, vacantSince:"2023-06-01",authority:"Governor",             constituent:"Patients & licensed physicians",                 criticalNote:"Licensing decisions delayed"},
      {id:109,name:"Board of Teaching",                                     domain:"education", totalSeats:15,vacantSeats:5, vacantSince:"2023-08-01",authority:"Governor",             constituent:"K–12 teachers & students",                      criticalNote:""},
      {id:110,name:"Governor's Workforce Development Board",                domain:"education", totalSeats:40,vacantSeats:12,vacantSince:"2023-09-01",authority:"Governor (federal req.)",constituent:"Job seekers & employers statewide",            criticalNote:"30% unfilled · federal compliance risk"},
      {id:111,name:"Pollution Control Citizens Advisory Committee",         domain:"environment",totalSeats:12,vacantSeats:5,vacantSince:"2023-01-20",authority:"Commissioner MPCA",    constituent:"Environmental justice communities",              criticalNote:"Permit review capacity reduced"},
      {id:112,name:"Indian Affairs Council",                                domain:"equity",    totalSeats:12,vacantSeats:4, vacantSince:"2023-03-01",authority:"Governor / Tribal nations",constituent:"11 Tribal Nations of Minnesota",              criticalNote:"Sovereignty consultation gaps"},
      {id:113,name:"Rehabilitation Council for the Blind",                  domain:"disability",totalSeats:13,vacantSeats:5, vacantSince:"2023-04-01",authority:"Governor",             constituent:"Minnesotans who are blind or low vision",       criticalNote:""},
      {id:114,name:"State Demographic Center Advisory Committee",           domain:"equity",    totalSeats:11,vacantSeats:5, vacantSince:"2023-11-01",authority:"Governor",             constituent:"All Minnesotans · data equity",                  criticalNote:"Census data policy delayed"},
    ]
  },
};

const REGION_ORDER = ["Mid-Atlantic","Northeast","Midwest"];
const COMING_SOON = {CA:"California",NY:"New York",TX:"Texas",FL:"Florida",IL:"Illinois",WA:"Washington",GA:"Georgia",OH:"Ohio",PA:"Pennsylvania",NC:"North Carolina"};

const ALL_DOMAINS = [
  {key:"all",         label:"All",             color:"#888780"},
  {key:"health",      label:"Health",          color:"#0F6E56"},
  {key:"education",   label:"Education",       color:"#185FA5"},
  {key:"equity",      label:"Equity",          color:"#534AB7"},
  {key:"environment", label:"Environment",     color:"#3B6D11"},
  {key:"housing",     label:"Housing",         color:"#854F0B"},
  {key:"disability",  label:"Disability",      color:"#993556"},
  {key:"justice",     label:"Justice",         color:"#993C1D"},
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
  return <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:4,background:"#e0e0e0",borderRadius:2,overflow:"hidden"}}><div style={{height:4,width:`${pct}%`,background:c,borderRadius:2}}/></div><span style={{fontSize:11,color:"#888",minWidth:38,textAlign:"right"}}>{vacant}/{total}</span></div>;
}

function EmbedModal({stateCode,onClose}){
  const [copied,setCopied]=useState(false);
  const code=`<script src="https://openquorum.org/widget.js"></script>\n<oq-vacancy-clock state="${stateCode.toLowerCase()}" theme="auto"></oq-vacancy-clock>`;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:12,padding:"1.5rem",maxWidth:480,width:"90%"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><p style={{margin:0,fontSize:14,fontWeight:500}}>Embed — {STATE_CONFIG[stateCode].label}</p><button onClick={onClose} style={{border:"none",background:"none",cursor:"pointer",fontSize:18,color:"#888"}}>×</button></div>
        <div style={{background:"#f5f5f5",borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:12,marginBottom:12,lineHeight:1.7,whiteSpace:"pre-wrap",wordBreak:"break-all"}}>{code}</div>
        <button onClick={()=>{navigator.clipboard?.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),2000)}} style={{width:"100%",padding:"8px 0",borderRadius:8,border:"1px solid #1D9E75",background:copied?"#1D9E75":"transparent",color:copied?"#fff":"#1D9E75",cursor:"pointer",fontSize:13,fontWeight:500}}>{copied?"Copied!":"Copy embed code"}</button>
      </div>
    </div>
  );
}

export default function VacancyClock(){
  const [stateCode,setStateCode]=useState("MD");
  const [domain,setDomain]=useState("all");
  const [sortBy,setSortBy]=useState("days");
  const [sortDir,setSortDir]=useState("desc");
  const [showEmbed,setShowEmbed]=useState(false);
  const [showMenu,setShowMenu]=useState(false);
  const [showNote,setShowNote]=useState(false);
  const [tick,setTick]=useState(0);

  useEffect(()=>{const t=setInterval(()=>setTick(n=>n+1),60000);return()=>clearInterval(t);},[]);

  const cfg=STATE_CONFIG[stateCode];
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
  const totalSeats=enriched.reduce((s,b)=>s+b.totalSeats,0);
  const critical=enriched.filter(b=>b.days>=365).length;
  const avgDays=Math.round(enriched.reduce((s,b)=>s+b.days,0)/enriched.length);
  const maxDays=Math.max(...enriched.map(b=>b.days));

  const toggleSort=col=>{if(sortBy===col)setSortDir(d=>d==="desc"?"asc":"desc");else{setSortBy(col);setSortDir("desc");}};
  const SortBtn=({col,label})=><button onClick={()=>toggleSort(col)} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,fontWeight:500,color:sortBy===col?"#1D9E75":"#888",padding:"0 2px",display:"flex",alignItems:"center",gap:3,whiteSpace:"nowrap"}}>{label}{sortBy===col?(sortDir==="desc"?" ↓":" ↑"):" ↕"}</button>;

  const byRegion=REGION_ORDER.map(r=>({region:r,states:Object.entries(STATE_CONFIG).filter(([,s])=>s.region===r)}));

  return(
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",maxWidth:1100,margin:"0 auto",padding:"0 0 2rem",color:"#1a1a1a"}} onClick={()=>showMenu&&setShowMenu(false)}>
      {showEmbed&&<EmbedModal stateCode={stateCode} onClose={()=>setShowEmbed(false)}/>}

      {/* Header */}
      <div style={{borderBottom:"1px solid #eee",paddingBottom:"1rem",marginBottom:"1.25rem"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4,flexWrap:"wrap"}}>
              <span style={{fontSize:20,fontWeight:600,letterSpacing:"-0.02em"}}>Open<span style={{color:"#1D9E75"}}>Quorum</span></span>

              {/* State picker */}
              <div style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
                <button onClick={()=>setShowMenu(v=>!v)} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:20,border:"1.5px solid #1D9E75",background:"#E1F5EE",color:"#0F6E56",fontWeight:600,fontSize:12,cursor:"pointer"}}>
                  {cfg.label} <span style={{fontSize:10}}>▾</span>
                </button>
                {showMenu&&(
                  <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:"#fff",border:"1px solid #eee",borderRadius:10,minWidth:240,zIndex:200,boxShadow:"0 4px 24px rgba(0,0,0,0.12)",overflow:"hidden",maxHeight:500,overflowY:"auto"}}>
                    {byRegion.map(({region,states})=>(
                      <div key={region}>
                        <p style={{margin:0,padding:"8px 14px 4px",fontSize:10,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.08em",borderTop:region!==REGION_ORDER[0]?"1px solid #f0f0f0":undefined}}>{region} · live data</p>
                        {states.map(([code,s])=>(
                          <button key={code} onClick={()=>{setStateCode(code);setDomain("all");setShowMenu(false);setShowNote(false);}}
                            style={{display:"block",width:"100%",textAlign:"left",padding:"8px 14px",border:"none",background:stateCode===code?"#E1F5EE":"transparent",color:stateCode===code?"#0F6E56":"#333",fontSize:13,cursor:"pointer",fontWeight:stateCode===code?600:400}}>
                            {s.label}{stateCode===code?" ✓":""}
                          </button>
                        ))}
                      </div>
                    ))}
                    <p style={{margin:"4px 0 0",padding:"6px 14px 4px",fontSize:10,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.08em",borderTop:"1px solid #f0f0f0"}}>Coming soon</p>
                    {Object.entries(COMING_SOON).map(([c,n])=>(
                      <div key={c} style={{padding:"5px 14px",fontSize:12,color:"#bbb",display:"flex",justifyContent:"space-between"}}>
                        <span>{n}</span><span style={{fontSize:10,background:"#f5f5f5",padding:"1px 6px",borderRadius:20}}>in progress</span>
                      </div>
                    ))}
                    <div style={{padding:"8px 12px",borderTop:"1px solid #f0f0f0",marginTop:4}}>
                      <button style={{width:"100%",padding:"6px 0",border:"1px dashed #1D9E75",borderRadius:8,background:"transparent",color:"#1D9E75",fontSize:12,cursor:"pointer",fontWeight:500}}>+ Request your state</button>
                    </div>
                  </div>
                )}
              </div>
              <span style={{fontSize:11,padding:"3px 8px",borderRadius:20,background:"#f0f0f0",color:"#999"}}>Sample data · scraper in development</span>
            </div>
            <p style={{margin:0,fontSize:12,color:"#888"}}>Vacancy Clock · {cfg.dataSource}</p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button onClick={()=>setShowEmbed(true)} style={{padding:"7px 14px",borderRadius:8,border:"1px solid #1D9E75",background:"transparent",color:"#1D9E75",cursor:"pointer",fontSize:12,fontWeight:500}}>&lt;/&gt; Embed</button>
            <a href={cfg.applyUrl} target="_blank" rel="noreferrer" style={{padding:"7px 14px",borderRadius:8,border:"1px solid #ddd",background:"transparent",color:"#555",fontSize:12,fontWeight:500,textDecoration:"none"}}>Apply ↗</a>
          </div>
        </div>
      </div>

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
            <p style={{margin:"0 0 3px",fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.label}</p>
            <p style={{margin:"0 0 2px",fontSize:20,fontWeight:600,color:s.accent,letterSpacing:"-0.02em"}}>{s.value}</p>
            <p style={{margin:0,fontSize:11,color:"#aaa"}}>{s.sub}</p>
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
            <div key={b.id} style={{border:"1px solid #eee",borderLeft:lb,borderRadius:"0 10px 10px 0",padding:"0.9rem 1rem",background:"#fff"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.06)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
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
        <p style={{margin:0,fontSize:11,color:"#bbb"}}>Data: <a href={`https://${cfg.dataSource}`} style={{color:"#1D9E75",textDecoration:"none"}}>{cfg.dataSource}</a> · <a href={cfg.applyUrl} style={{color:"#1D9E75",textDecoration:"none"}}>{cfg.applyLabel}</a> · <a href="https://github.com/openquorum" style={{color:"#1D9E75",textDecoration:"none"}}>GitHub</a></p>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setShowEmbed(true)} style={{padding:"5px 12px",borderRadius:8,border:"1px solid #ddd",background:"transparent",color:"#888",cursor:"pointer",fontSize:11}}>Embed</button>
          <button onClick={()=>navigator.clipboard?.writeText(`${cfg.label} has ${totalVacant} unfilled state board seats — some vacant for over ${(maxDays/365).toFixed(1)} years. Track at openquorum.org`)} style={{padding:"5px 12px",borderRadius:8,border:"1px solid #1D9E75",background:"transparent",color:"#1D9E75",cursor:"pointer",fontSize:11,fontWeight:500}}>Share data</button>
        </div>
      </div>
    </div>
  );
}
