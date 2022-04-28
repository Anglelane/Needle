import * as COMMON from "../_common/common.js";

function witchOnClick(e, context, i, j) {
  e.srcElement.classList.add("witch");
  context.boxArray[i][j].infos["witch"] = true;

  context.boxArray[i][j].witchTimer = 2;
  context.boxArray[i][j].signs[`witch-signs2`] = true;
  context.boxArray[i][j].infos[`witch-notes2`] = true;
  context.witches.push(COMMON.setPair(i, j));
}
function witchCountDown(context, curr) {
  if (
    curr &&
    context.witches.indexOf(COMMON.setPair(curr.i, curr.j)) > -1 &&
    context.witches.length == 1
  )
    return;
  var isDark = curr && context.MOONS.indexOf(curr.roleid) > -1;
  if (context.witches.length > 0 && isDark) {
    context.chances = 1;
  }
  for (var i = 0; i < context.witches.length; ) {
    var [fx, fy] = COMMON.getPair(context.witches[i]);
    var witch = context.boxArray[fx][fy];
    var t = witch.witchTimer;
    delete witch.signs[`witch-signs${t}`];
    delete witch.infos[`witch-notes${t}`];
    if (isDark) t = 0;
    else t--;
    if (t > 0) {
      witch.signs[`witch-signs${t}`] = true;
      witch.infos[`witch-notes${t}`] = true;
      witch.witchTimer = t;
      i++;
    } else {
      context.witches.splice(i, 1);
    }
  }
}
export { witchOnClick, witchCountDown };
