module.exports = class Analyze {
  constructor() {
    this.resultLayout = [];
  }

  doAnalyzeLayout(data) {
    const laoyutAna = analyzeLayout(data);
    this.resultLayout.push(laoyutAna);
    return this.resultLayout;
  }
};

analyzeLayout = data => {
  const formated = data.formated;
  const choosenFormat = data.choosenFormat;

  let layoutAna = [];

  const extractMeadiaQuery = formated.match(/@media+([a-zA-Z0-9 -:(){}\r\n;])*/g);
  const extractedMediaQueryTypes = mediaqueryType(proofNotNULL(extractMeadiaQuery));

  const formatedNoMQs = formated.replace(proofNotNULL(extractMeadiaQuery), "");
  const extractedTagsDesktop = extractTags(formatedNoMQs);
  const extractedTagsMobile = extractTags(proofStringNotNull(extractedMediaQueryTypes.mobile[0]));

  const extractedDivDisplayDesktop = extractDisplay(proofNotNULL(extractedTagsDesktop.div));
  const extractedDivDisplayMobile = extractDisplay(proofNotNULL(extractedTagsMobile.div));

  const extractedFlexRowDesktop = extractFlexCondition(proofNotNULL(extractedDivDisplayDesktop.flex));
  const extractedFlexRowMobile = extractFlexCondition(proofNotNULL(extractedDivDisplayMobile.flex));

  if (choosenFormat == "mobile" || (choosenFormat == "both" && extractedFlexRowDesktop == true && extractedDivDisplayDesktop.length != 0)) {
    if (extractedDivDisplayMobile.flex.length == 0) {
      layoutAna.push(
        "You arrange the contents of your divs next to each other in your desktop layout, but you do not resolve this in your media queries. You should change that."
      );
    } else if (extractedDivDisplayMobile.div == null) {
      layoutAna.push(
        "You arrange the contents of your divs next to each other in your desktop layout, but you do not resolve this in your media queries. You should change that."
      );
    } else if (proofNotNULL(!extractedTagsMobile.div[0].includes("display: block")) && proofNotNULL(extractedFlexRowMobile) == true) {
      layoutAna.push(
        "You arrange the contents of your divs next to each other in your desktop layout, but you do not resolve this in your media queries. You should change that."
      );
    }
  }
  return layoutAna;
};

extractTags = f => {
  const d = f.match(/div {+[\r\n ]+([a-zA-Z -:0-9.;\r\n])*}+/g);
  const i = f.match(/img {+[\r\n ]+([a-zA-Z -:0-9.;\r\n])*}+/g);

  let allTags = {
    div: d,
    img: i
  };
  return allTags;
};

mediaqueryType = emqs => {
  let intOnly = [];
  let mediaOnly = [];
  let mobile = [];
  let tablet = [];

  for (let i = 0; i < emqs.length; i++) {
    mediaOnly = emqs[i].match(/@media screen+([a-zA-Z0-9 -:()])*{+/g);
    for (let i = 0; i < mediaOnly.length; i++) {
      intOnly.push(parseInt(mediaOnly[i].replace("px) {", "").slice(30)));
      if (intOnly <= 640) {
        mobile.push(emqs[i]);
      }
    }
  }
  let allMQs = {
    mobile: mobile,
    tablet: tablet
  };
  return allMQs;
};

extractDisplay = eTags => {
  let fl = [];
  let gr = [];
  for (let e of eTags) {
    if (e.match("flex")) {
      fl.push(e);
    }
    if (e.match("grid")) {
      gr.push(e);
    }
  }
  let allDisplays = {
    flex: fl,
    grid: gr
  };
  return allDisplays;
};

extractFlexCondition = eFlex => {
  let inRow = Boolean;
  for (let e of eFlex) {
    if (e.match("flex-direction: row;") || e.match("flex-direction: row-reverse;")) {
      inRow = true;
    }
    if (e.match("flex-direction: column;") || e.match("flex-direction: column-reverse;")) {
      inRow = false;
    }
  }
  return inRow;
};

proofNotNULL = check => {
  let toProof = [];
  check ? (toProof = check) : (toProof = []);
  return toProof;
};

proofStringNotNull = check => {
  let toProof = String;
  check ? (toProof = check) : (toProof = "Placeholder");
  return toProof;
};
