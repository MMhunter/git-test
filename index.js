/**
 *
 X          Y     Meaning                            TEST CASES
 -------------------------------------------------
 [AMD]   not updated
 M        [ MD]   updated in index                 M_.txt  MM.txt  MD.txt
 A        [ MD]   added to index                   A_.txt  AM.txt  AD.txt
 D                deleted from index               D_.txt
 R        [ MD]   renamed in index                 R_1.txt -> R_2.txt    RM1.txt->RM2.txt  RD1.txt->RD2.txt
 C        [ MD]   copied in index
 [MARC]           index and work tree matches
 [ MARC]     M    work tree changed since index    _M.txt
 [ MARC]     D    deleted in work tree             _D.txt
 [ D]        R    renamed in work tree
 [ D]        C    copied in work tree
 -------------------------------------------------
 D           D    unmerged, both deleted          DD.txt
 A           U    unmerged, added by us           AU.txt
 U           D    unmerged, deleted by them       UD.txt
 U           A    unmerged, added by them         UA.txt
 D           U    unmerged, deleted by us         DU.txt
 A           A    unmerged, both added            AA.txt
 U           U    unmerged, both modified         UU.txt
 -------------------------------------------------
 ?           ?    untracked                       ??.txt
 !           !    ignored                         !!.txt
 -------------------------------------------------
 */

const child_process = require('child_process');
const fs = require('fs');
const join = require('path').join;

function runGit(args) {
  child_process.execSync('git', args);
}

function stage(file) {
  runGit(['stage', '--', file]);
}

/**
 * CLEAN
 */
runGit(['reset','--hard']);

/**
 * TEST CASES GENERATION
 */

const GENS = [];

/**
 * M_.txt
 */
function M_() {
  const file = join('tests', 'M_.txt');
  fs.writeFileSync(file, 'M_: modified');
  stage(file);
}
GENS.push(M_);

/**
 * MM.txt
 */
function MM() {
  const file = join('tests', 'MM.txt');
  fs.writeFileSync(file, 'MM: modified in index');
  stage(file);
  fs.writeFileSync(file, 'MM: modified in work tree');
}
GENS.push(MM);

/**
 * MD.txt
 */
function MD() {
  const file = join('tests', 'MD.txt');
  fs.writeFileSync(file, 'MD: modified in index');
  stage(file);
  fs.unlink(file);
}
GENS.push(MD);






