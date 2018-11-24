/**
 *
 X          Y     Meaning                            TEST CASES
 -------------------------------------------------
 [AMD]   not updated
 M        [ MD]   updated in index                 M_.js  MM.js  MD.js
 A        [ MD]   added to index                   A_.js  AM.js  AD.js
 D                deleted from index               D_.js
 R        [ MD]   renamed in index                 R_1.js -> R_2.js    RM1.js->RM2.js  RD1.js->RD2.js
 C        [ MD]   copied in index
 [MARC]           index and work tree matches
 [ MARC]     M    work tree changed since index    _M.js
 [ MARC]     D    deleted in work tree             _D.js
 [ D]        R    renamed in work tree
 [ D]        C    copied in work tree
 -------------------------------------------------
 D           D    unmerged, both deleted          DD.js
 A           U    unmerged, added by us           AU.js
 U           D    unmerged, deleted by them       UD.js
 U           A    unmerged, added by them         UA.js
 D           U    unmerged, deleted by us         DU.js
 A           A    unmerged, both added            AA.js
 U           U    unmerged, both modified         UU.js
 -------------------------------------------------
 ?           ?    untracked                       ??.js
 !           !    ignored                         !!.js
 -------------------------------------------------
 */

