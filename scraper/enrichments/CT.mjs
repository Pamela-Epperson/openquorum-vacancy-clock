// ─── Connecticut enrichment overlay — HUMAN-VERIFIED (CGS) ─────────────────────
// Ported July 25, 2026 when CT moved from a 3-row manual seed to the portal.ct.gov
// inventory profile (profiles/ct.mjs). Keys match the portal directory names the
// profile emits. totalSeats = GOVERNOR-APPOINTED VOTING SEATS ONLY (per Pamela's
// 2026-10-01 standard); criticalNote discloses the surrounding board where mixed.
// Depth expansion 2026-10-01: +17 statute-cited boards (CGS). Boards whose seats
// are legislative-appointed, governor-NOMINATED-but-GA-appointed, or single-officer
// offices are intentionally excluded (see OPENQUORUM-ANOMALY-FINDINGS.md).
export const ENRICHMENTS = {
  "Connecticut Medical Examining Board": {
    totalSeats: 21, domain: "health",
    constituent: "Connecticut patients & licensed physicians",
    mandate: "Licenses and disciplines Connecticut physicians. Twenty-one governor-appointed members — thirteen physicians, one physician assistant, seven public members (CGS § 20-8a).",
    seatSource: "https://law.justia.com/codes/connecticut/title-20/chapter-370/section-20-8a/",
  },
  "Connecticut State Board of Education": {
    totalSeats: 9, domain: "education",
    constituent: "Connecticut K-12 students & families",
    mandate: "Oversees Connecticut's public elementary and secondary education. Nine governor-appointed voting members, alongside three ex-officio members and two (nonvoting) student members (CGS § 10-1).",
    seatSource: "https://law.justia.com/codes/connecticut/title-10/chapter-163/section-10-1/",
    criticalNote: "9 governor-appointed voting members; board also seats 3 ex-officio and 2 nonvoting student members",
  },
  "Developmental Disabilities, Connecticut Council of": {
    totalSeats: 24, domain: "disability",
    constituent: "Connecticut residents with developmental disabilities",
    mandate: "Federally mandated DD Council advocating for Connecticut residents with developmental disabilities. Twenty-four governor-appointed members.",
    seatSource: "https://portal.ct.gov/CTCDD/About/About-Us/Who-We-Are-and-What-We-Do",
  },
  "Pardons and Paroles, Board of": {
    totalSeats: 10, domain: "justice",
    constituent: "Connecticut's incarcerated people, parolees & pardon applicants",
    mandate: "Grants paroles and pardons and sets release policy in Connecticut. Ten full-time members appointed by the Governor with the consent of the General Assembly (CGS § 54-124a).",
    seatSource: "https://law.justia.com/codes/connecticut/title-54/chapter-961/section-54-124a/",
    criticalNote: "Ten full-time governor-appointed members; the Governor may also appoint up to five part-time members",
  },
  "Human Rights and Opportunities, Commission on": {
    totalSeats: 5, domain: "equity",
    constituent: "Connecticut residents protected under state anti-discrimination law",
    mandate: "Enforces Connecticut's anti-discrimination laws and adjudicates civil-rights complaints. Nine-member commission; five members appointed by the Governor, four by legislative leaders, all with General Assembly consent (CGS § 46a-52).",
    seatSource: "https://law.justia.com/codes/connecticut/title-46a/chapter-814c/",
    criticalNote: "5 of 9 seats are governor-appointed (4 appointed by legislative leaders)",
  },
  "Psychiatric Security Review Board": {
    totalSeats: 6, domain: "justice",
    constituent: "Connecticut insanity acquittees, victims & the public",
    mandate: "Supervises persons acquitted by reason of mental disease and committed to its jurisdiction. Six governor-appointed members — a psychiatrist, a psychologist, a probation expert, an attorney, and two public members (CGS § 17a-581).",
    seatSource: "https://law.justia.com/codes/connecticut/title-17a/chapter-319i/section-17a-581-formerly-sec-17-257b/",
  },

  // ── Depth expansion 2026-10-01 (governor-appointed voting seats only) ──
  "Firearms Permit Examiners, Board of": {
    totalSeats: 8, domain: "justice",
    constituent: "Connecticut pistol-permit applicants & the public",
    mandate: "Hears appeals from denials and revocations of firearm permits and certificates. Nine-member board; eight members appointed by the Governor from named organizations' nominees (at least one a licensed attorney), plus one retired Superior Court judge named by the Chief Court Administrator (CGS § 29-32b).",
    seatSource: "https://www.cga.ct.gov/2015/rpt/2015-R-0041.htm",
    criticalNote: "8 of 9 seats are governor-appointed (1 retired judge named by the Chief Court Administrator)",
  },
  "Environmental Quality, Council on": {
    totalSeats: 5, domain: "environment",
    constituent: "Connecticut's environment & the public's right to monitor it",
    mandate: "Independent monitor of Connecticut's environmental quality and compliance. Nine-member council; five members appointed by the Governor (including the chair), two by the Speaker of the House, two by the Senate President Pro Tempore (CGS § 22a-11).",
    seatSource: "https://law.justia.com/codes/connecticut/title-22a/chapter-439/section-22a-11/",
    criticalNote: "5 of 9 seats are governor-appointed (4 appointed by legislative leaders)",
  },
  "Judicial Selection Commission": {
    totalSeats: 6, domain: "justice",
    constituent: "Connecticut residents & the integrity of the state judiciary",
    mandate: "Vets and recommends candidates for Connecticut judgeships. Twelve-member commission; six members appointed by the Governor (all attorneys, one from each congressional district), six by legislative leaders (CGS § 51-44a).",
    seatSource: "https://codes.findlaw.com/ct/title-51-courts/ct-gen-st-sect-51-44a/",
    criticalNote: "6 of 12 seats are governor-appointed (6 appointed by legislative leaders)",
  },
  "Freedom of Information Commission": {
    totalSeats: 5, domain: "justice",
    constituent: "Connecticut residents seeking access to public records & meetings",
    mandate: "Enforces Connecticut's Freedom of Information Act and adjudicates access complaints. Nine-member commission; five members appointed by the Governor, four by legislative leaders, all with General Assembly consent (CGS § 1-205).",
    seatSource: "https://www.cga.ct.gov/current/pub/chap_014.htm",
    criticalNote: "5 of 9 seats are governor-appointed (4 appointed by legislative leaders)",
  },
  "Elections Enforcement Commission, State": {
    totalSeats: 1, domain: "justice",
    constituent: "Connecticut voters & the integrity of state elections",
    mandate: "Enforces Connecticut's election and campaign-finance laws. Five-member commission; one member appointed by the Governor and one each by the four legislative leaders, all with General Assembly consent (CGS § 9-7a).",
    seatSource: "https://law.justia.com/codes/connecticut/title-9/chapter-141/section-9-7a/",
    criticalNote: "1 of 5 seats is governor-appointed (4 appointed by legislative leaders)",
  },
  "Connecticut State Marshal Commission": {
    totalSeats: 1, domain: "justice",
    constituent: "Connecticut state marshals & recipients of legal service",
    mandate: "Oversees and appoints Connecticut state marshals. Eight-member commission; the Governor appoints one member as chairperson, the Chief Justice one Superior Court judge, and legislative leaders the remaining six (CGS § 6-38b).",
    seatSource: "https://law.justia.com/codes/connecticut/title-6/chapter-78/section-6-38b/",
    criticalNote: "1 of 8 seats is governor-appointed (1 judge by the Chief Justice, 6 by legislative leaders)",
  },
  "Teachers' Retirement Board": {
    totalSeats: 5, domain: "equity",
    constituent: "Connecticut public-school teachers & retirees",
    mandate: "Administers the Connecticut Teachers' Retirement System. Board includes five public members appointed by the Governor, alongside elected teacher/retiree members and ex-officio state officials (CGS ch. 167a).",
    seatSource: "https://www.cga.ct.gov/current/pub/chap_167a.htm",
    criticalNote: "5 governor-appointed public members; the remaining seats are elected teacher/retiree members and ex-officio officials",
  },
  "Siting Council": {
    totalSeats: 5, domain: "environment",
    constituent: "Connecticut communities affected by energy & telecom facilities",
    mandate: "Decides the siting of power plants, transmission lines and telecommunication towers. Nine-member council; five members appointed by the Governor (including the chair), two by legislative leaders, plus the DEEP Commissioner and PURA chair ex officio (CGS § 16-50j).",
    seatSource: "https://law.justia.com/codes/connecticut/title-16/chapter-277a/section-16-50j/",
    criticalNote: "5 of 9 seats are governor-appointed (2 legislative, 2 ex officio)",
  },
  "State Contracting Standards Board": {
    totalSeats: 8, domain: "justice",
    constituent: "Connecticut taxpayers & the integrity of state procurement",
    mandate: "Oversees and reforms Connecticut's state contracting and procurement. Fourteen-member board; eight members appointed by the Governor (including the chair), six by legislative leaders (CGS § 4e-2).",
    seatSource: "https://law.justia.com/codes/connecticut/title-4e/chapter-62/section-4e-2/",
    criticalNote: "8 of 14 seats are governor-appointed (6 appointed by legislative leaders)",
  },
  "Fire Prevention and Control, Commission on": {
    totalSeats: 12, domain: "justice",
    constituent: "Connecticut firefighters & the public they protect",
    mandate: "Sets Connecticut's firefighter training and certification standards. Twelve members appointed by the Governor representing named fire-service organizations, plus the State Fire Marshal and community-college chancellor ex officio (CGS § 7-323k).",
    seatSource: "https://law.justia.com/codes/connecticut/title-7/chapter-104/section-7-323k/",
    criticalNote: "12 governor-appointed members plus 2 ex-officio voting members",
  },
  "State Insurance and Risk Management Board": {
    totalSeats: 9, domain: "justice",
    constituent: "Connecticut taxpayers & the state's insured assets",
    mandate: "Directs Connecticut's state insurance and risk-management program. Nine members appointed by the Governor (three public members, six qualified by training/experience), plus the Comptroller ex officio (CGS § 4a-19).",
    seatSource: "https://www.cga.ct.gov/current/pub/chap_057a.htm#sec_4a-19",
    criticalNote: "9 governor-appointed members plus the Comptroller ex officio",
  },
  "Employees' Review Board": {
    totalSeats: 7, domain: "justice",
    constituent: "Connecticut non-union state employees with grievances",
    mandate: "Hears and decides grievances of non-union Connecticut state employees. Seven members appointed by the Governor, at least one an attorney experienced in administrative or labor law (CGS § 5-201).",
    seatSource: "https://law.justia.com/codes/connecticut/title-5/chapter-67/section-5-201/",
  },
  "Examining Board for Crane Operators": {
    totalSeats: 5, domain: "justice",
    constituent: "Connecticut crane operators, owners & worksite public safety",
    mandate: "Licenses crane operators and sets crane-safety standards in Connecticut. Five members appointed by the Governor — a department employee, an experienced crane operator, a crane-owner representative, and two public members (CGS § 29-221).",
    seatSource: "https://www.cga.ct.gov/current/pub/chap_539.htm",
  },
  "Sentencing Commission": {
    totalSeats: 1, domain: "justice",
    constituent: "Connecticut's criminal-justice system & the public",
    mandate: "Reviews Connecticut's criminal sentencing policies and recommends reforms. Twenty-three-member commission; one public member appointed by the Governor, the remainder ex-officio justice officials and legislative appointees (CGS § 54-300).",
    seatSource: "https://law.justia.com/codes/connecticut/title-54/chapter-970/section-54-300/",
    criticalNote: "1 of 23 voting members is governor-appointed (remainder ex-officio and legislative)",
  },
  "State Emergency Response Commission": {
    totalSeats: 9, domain: "environment",
    constituent: "Connecticut communities exposed to hazardous-materials risk",
    mandate: "Coordinates Connecticut's hazardous-materials emergency planning and right-to-know program. Eighteen-member commission; nine members appointed by the Governor (four public, three facility operators, one municipal fire chief, plus the chair) (CGS § 22a-601).",
    seatSource: "https://www.cga.ct.gov/current/pub/chap_446l.htm",
    criticalNote: "9 of 18 seats are governor-appointed",
  },
  "Judicial Review Council": {
    totalSeats: 12, domain: "justice",
    constituent: "Connecticut residents & accountability of the state judiciary",
    mandate: "Investigates complaints of judicial misconduct or disability in Connecticut. Twelve members — three Superior Court judges, three attorneys, and six public members — all appointed by the Governor with the approval of the General Assembly (CGS § 51-51k).",
    seatSource: "https://law.justia.com/codes/connecticut/title-51/chapter-872a/section-51-51k/",
    criticalNote: "12 governor-appointed members (with General Assembly approval); 13 alternate members excluded",
  },
  "Educational Technology, Commission for": {
    totalSeats: 2, domain: "education",
    constituent: "Connecticut students, libraries & educational-technology users",
    mandate: "Coordinates Connecticut's educational-technology strategy across schools, libraries and higher education. Two business/IT-expert members appointed by the Governor, alongside ex-officio state officials and named association representatives (CGS § 4d-80).",
    seatSource: "https://law.justia.com/codes/connecticut/title-4d/chapter-61a/section-4d-80/",
    criticalNote: "2 governor-appointed members; remainder ex-officio officials and association representatives",
  },
};
