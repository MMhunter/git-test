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
  child_process.execSync('/usr/local/bin/git ' + args.join(' '));
}

function stage(file) {
  runGit(['stage', '--', file]);
}

/**
 * CLEAN
 */
runGit(['checkout','head', '--', 'tests']);
runGit(['clean','-f', '--', 'tests']);

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
  fs.unlink(file, () => null);
}
GENS.push(MD);


/**
 * A_.txt
 */
function A_() {
  const file = join('tests', 'A_.txt');
  fs.writeFileSync(file, 'A_: initial content');
  stage(file);
}
GENS.push(A_);


/**
 * A_.txt
 */
function AM() {
  const file = join('tests', 'AM.txt');
  fs.writeFileSync(file, 'AM: initial content');
  stage(file);
  fs.writeFileSync(file, 'AM: modified');
}
GENS.push(AM);


/**
 * A_.txt
 */
function AD() {
  const file = join('tests', 'AD.txt');
  fs.writeFileSync(file, 'AD: initial content');
  stage(file);
  fs.unlink(file, () => null);
}
GENS.push(AD);

/**
 * D_.txt
 */
function D_() {
  const file = join('tests', 'D_.txt');
  fs.unlink(file, () => null);
  stage(file);
}
GENS.push(D_);

/**
 * R_.txt
 */
function R_() {
  const src = join('tests', 'R_1.txt');
  const target = join('tests', 'R_2.txt');
  fs.rename(src,target, () => null);
  stage(src);
  stage(target);
}
GENS.push(R_);

/**
 * R_.txt
 */
function RM() {
  const src = join('tests', 'RM1.txt');
  const target = join('tests', 'RM2.txt');
  fs.rename(src,target, () => null);
  stage(src);
  stage(target);
  fs.writeFileSync(target, 'RM: modified in work tree');
}
GENS.push(RM);

/**
 * R_.txt
 */
function RD() {
  const src = join('tests', 'RD1.txt');
  const target = join('tests', 'RD2.txt');
  fs.rename(src,target, () => null);
  stage(src);
  stage(target);
  fs.unlink(target, () => null)
}
GENS.push(RD);

/**
 * _M.txt
 */
function _M() {
  const file = join('tests', '_M.txt');
  fs.writeFileSync(file, '_M: modified');
}
GENS.push(_M);

/**
 * _D.txt
 */
function _D() {
  const file = join('tests', '_D.txt');
  fs.unlink(file, () => null)
}
GENS.push(_D);







GENS.forEach(g => g());






