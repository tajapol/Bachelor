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
  const formatted = data.formatted;
  const choosenFormat = data.choosenFormat;

  let layoutAna = [];
  let layoutAnaDesktop = [];
  let layoutAnaMobile = [];

  const extractMeadiaQuery = formatted.match(/@media+([a-zA-Z0-9 -:(){}\r\n;])*/g);
  const extractedMediaQueryTypes = mediaqueryType(proofNotNULL(extractMeadiaQuery));

  const formattedNoMQs = formatted.replace(proofNotNULL(extractMeadiaQuery), "");
  const extractedTagsDesktop = extractTags(formattedNoMQs);
  const extractedTagsMobile = extractTags(proofStringNotNull(extractedMediaQueryTypes[0]));

  const extractedDivDisplayDesktop = extractDisplay(proofNotNULL(extractedTagsDesktop.div));
  const extractedDivDisplayMobile = extractDisplay(proofNotNULL(extractedTagsMobile.div));

  const extractedFlexRowDesktop = extractFlexCondition(proofNotNULL(extractedDivDisplayDesktop.flex));
  const extractedFlexRowMobile = extractFlexCondition(proofNotNULL(extractedDivDisplayMobile.flex));

  console.log(extractedDivDisplayDesktop.flex);

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

  for (let i = 0; i < emqs.length; i++) {
    mediaOnly = emqs[i].match(/@media screen+([a-zA-Z0-9 -:()])*{+/g);
    for (let i = 0; i < mediaOnly.length; i++) {
      intOnly.push(parseInt(mediaOnly[i].replace("px) {", "").slice(30)));
      if (intOnly <= 640) {
        mobile.push(emqs[i]);
      }
    }
  }
  return mobile;
};

extractDisplay = eTags => {
  let fl = [];
  let gr = [];
  for (let e of eTags) {
    if (e.match("display: flex")) {
      fl.push(e);
    }
    if (e.match("display: grid")) {
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
    if (e.match("flex-direction: row;")) {
      inRow = true;
    }
    if (e.match("flex-direction: column;")) {
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
