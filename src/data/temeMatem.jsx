let temeMatem = [
  {
    id: "1",
    title: "Mulţimi numerice",
    disciplina: "Matematica",
    ciclul: "Ciclul gimnazial",
    subtitles: [
      {
        id: "1",
        name: "Mulțimea numerelor naturale",
        addressDisciplina: "/matem",
        address: "/multimea-numerelor-naturale",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "1",
            subtitleID: "1",
            titleID: "1",
            name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-naturale",
            addressSubject: "/multimi-operatii-cu-multimi",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor naturale",
                path: "/matem/multimea-numerelor-naturale",
              },
            ],
            vomAfla: [
              {
                name: "Definiția mulțimilor",
                id: "1",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                raspuns: [{sarcina:"Definiția mulțimii", rezolvare: "<p style='padding:15px;text-indent:20px;'><b>Mulțimea</b> este o totalitate de obiecte bine determinate și distincte, numite elementele mulțimii.<p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/multimiDef.jpg",
                ],
              },
              {
                name: "Modurile de reprezentare a mulțimii",
                id: "2",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                raspuns: [{sarcina:"Modurile de reprezentare a mulțimii", rezolvare:"<p style='padding:15px;'>1) prin <b>enumerarea</b> elementelor mulțimii (între acolade): A = {1,4, 9, 16, 25, 36, 49}<br>2) prin <b>descriere verbală</b>: 'B este mulțimea fetelor din clasa V-a'<br>3) prin <b>diagrama Venn-Euler</b><br>4) prin <b>definiția mulțimii</b>: C = {x | x∈N,x<5}"}]
                  ,
                audio: "/sound/soundsample.mp3",
                images: [
                  "/images/multimiReprezentare.jpg",
                ],
              },
              {
                name: "Relația de apartenență la mulțime",
                id: "3",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                raspuns: [{sarcina:"Relația de apartenență la mulțime", rezolvare:"<p style='padding:15px;text-indent:20px;'>Un element aparţine unei mulţimi dacă acel element este conţinut în mulţimea respectivă, se notează '∈'<br>Ex: pentru A = {2,3,5} 2 ∈ A; 4 ∉ A</p>"}]
                  ,
                audio: "/sound/soundsample.mp3",
                images: [
                  "/images/multimiApartenenta.jpg",
                ],
              },
              {
                name: "Mulțimi egale",
                id: "4",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                raspuns: [{sarcina:"Mulțimi egale", rezolvare:"<p style='padding:15px;text-indent:20px;'><b>Mulțimi egale</b> sunt mulţimile care au aceleaşi elemente, indiferent de ordinea în care apar aceste elemente<br>Ex: {2,3,5} = {3,5,2}</p>"}]
                  ,
                audio: "/sound/soundsample.mp3",
                images: [
                  "/images/multimiEgale.jpg",
                ],
              },
              {
                name: "Submulțimi",
                id: "5",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                raspuns: [{sarcina:"Submulțimi", rezolvare:"<p style='padding:15px;text-indent:20px;'><b>Submulțime</b> este o mulţime inclusă în mulţimea iniţială<br>Ex: Dacă A = {2,3,5} ,atunci submulțimile lui A sunt: {2,3}, {2,5}, {3,5}, {2}, {3}, {5}, ∅<br> Includerea (incluziunea) unei submulțimi în mulțimea inițială, se notează '⊂'<br>Ex: {2,3} ⊂  {2,3,5}; <br>{4} ⊄  {2,3,5};<br> {2,3,5} ⊄  {2,3};<br><b>Obs1</b>: Orice mulţime este inclusă în ea însăşi: A ⊂ A, pentru ∀ mulțime A.<br><b>Obs2</b>: ∅ este submulţime a oricărei mulţimi: ∅ ⊂ A, pentru  ∀ mulțime A.</p>"}]
                  ,
                audio: "/sound/soundsample.mp3",
                images: [
                  "/images/multimiSub.jpg",
                ],
              },
              {
                name: "Cardinalul mulțimii finite",
                id: "6",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                raspuns: [{sarcina:"Cardinalul mulțimii finite", rezolvare:"<p style='padding:15px;text-indent:20px;'><b>Cardinalul mulțimii finite</b> este numărul de elemente din mulțimea respectivă, se notează 'card': <br>Ex: card {2,3,5} = 3;<br>card N = ∞;\ncard ∅ = 0</p>"}]
                  ,
                audio: "/sound/soundsample.mp3",
                images: [
                  "/images/multimiCard.jpg",
                ],
              },
              {
                name: "Operații cu mulțimi",
                id: "7",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                raspuns:
                [{sarcina:"Operații cu mulțimi", rezolvare: "<p style='padding:15px 15px 5px;text-indent:20px;'>1) <b>Reuniunea</b> mulțimilor A și B = toate elementele comune și necomune ale acestor mulțimi, fiecare element apărând o singură dată. <br>Ex: A = {2,3,5}, B = {3,4,5}, A ∪ B = {2,3,4,5}; </p><p style='padding:0 15px 5px;text-indent:20px;'>2) <b>Intersecția</b> mulțimilor A și B = toate elementele comune ambelor mulțimi, fiecare element apărând o singură dată.<br>Ex: A = {2,3,5}, B = {3,4,5}, A ∩ B = {3,5};<br><b><em>Notă</em></b>: <u>Mulțimi disjuncte</u> = mulțimile ce nu au nici un element comun: A ∩ B = ∅;</p><p style='padding:0 15px 5px;text-indent:20px;'>3) <b>Diferența</b> a 2 mulțimi A și B = toate elementele ce aparțin primei mulțimi (A) și nu aparțin celei de-a doua (B). <br>Ex: A = {2,3,5}, B = {3,4,5}, A \\ B = {2}; B \\ A = {4};</p><p style='padding:0 15px 15px;text-indent:20px;'>4) <b>Produs cartezian</b> a 2 mulțimi = mulțimea formată din perechi de forma (x,y), unde x ∈ A, y ∈ B; Ex: A = {1,2}, B = {a, b, c}; <br>A × B = {(1,a), (1,b), (1,c), (2,a), (2,b), (2,c)}<br>B × A = {(a,1), (b,1), (c,1), (a,2), (b,2), (c,2)} </p>"}]
                  ,
                audio: "/sound/soundsample.mp3",
                images: [
                  "/images/multimiUniune.jpg",
                  "/images/multimiIntersectia.jpg",
                  "/images/multimiDisjuncte.jpg",
                  "/images/multimiDiferenta.jpg",
                  "/images/multimiProdus.jpg",
                ],
              },
              {
                name: "Mulțimi de numere",
                id: "8",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                raspuns: [{sarcina:"Mulțimi de numere", rezolvare:"<p style='padding:15px 15px 5px;text-indent:20px;'>1) <b>Numere naturale</b>: N = {0,1,2,3, √16…}</p><p style='padding:0 15px 5px;text-indent:20px;'>2) <b>Numere întregi</b>: Z = {-3,-2,-1,0,1,2,3,…}, Z \\ N = {-3,-2,-1}</p><p style='padding:0 15px 5px;text-indent:20px;'>3) <b>Numere raționale</b> Q = {fracții zecimale cu număr finit de zecimale} ∪ {fracții zecimale periodice} ∪ {fracții ordinare} = mulțimea numerelor care pot fi scrise sub formă de fracții între numerele întregi; <br>Q = { -0.7, 0.(3), 0.2(67), 3/4, 0, -3, 5, 8/1..}<br>Q \\ Z = { -0.7, 0.(3), 0.2(67), 3/4, }</p><p style='padding:0 15px 5px;text-indent:20px;'>4) <b>Numere reale</b> R = toate numerele</p><p style='padding:0 15px 15px;text-indent:20px;'>5) <b>Numere iraționale</b> R \\ Q = {fracţiile zecimale cu un număr infinit de zecimale neperiodice} => nu pot fi exprimate ca fracții între numerele întregi R \\ Q = {√2, √10, π, 2.3456…}</p>"}]
                  ,
                audio: "/sound/soundsample.mp3",
                images: [
                  "/images/multimiNumere.jpg",
                ],
              },
              {
                name: "Incluziunile  N ⊂ Z ⊂ Q ⊂ R",
                id: "9",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                raspuns: [{sarcina:"Incluziunile  N ⊂ Z ⊂ Q ⊂ R", rezolvare:"<p style='padding:15px;'>Sunt adevărate incluziunile:  N ⊂ Z ⊂ Q ⊂ R</p>"}]
                  ,
                audio: "/sound/soundsample.mp3",
                images: [
                  "/images/multimiIncluziune.jpg",
                ],
              },
            ],
            innerHTML: "",
            note: [
              {
                id: "1",
                headerInnerHTML:
                  "<span>Puterile Centrale și Antanta – 2 blocurile politico-militare</span> din Europa din 1914:",
                bodyInnerHTML: "",
              },
            ],
            teste: [
              {
                id: "1",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Alege afirmația corectă",
                complexity: "simplu",
                complexityNumber: 1,
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/alege-afirmatia-corecta",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/alege-afirmatia-corecta",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                type: "quiz",
                coloane: [],
                cerinte: "Alege afirmația corectă",
                quizArray: [
                  {
                    id: "1",
                    testID: "1",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    answers: [
                      {
                        text: "România a intrat în Primul Război Mondial în anul 1916",
                        rezolvare:
                          "România întradevăr a intrat în Primul Război Mondial în anul 1916",
                      },
                      {
                        text: "Regele României în timpul Primului Război Mondial a fost Carol I",
                        rezolvare:
                          "Regele României în timpul Primului Război Mondial nu a fost Carol I",
                      },
                      {
                        text: "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                        rezolvare:
                          "România a semnat Tratatul de la București, care a pus capăt participării sale în Primul Război Mondial",
                      },
                      {
                        text: "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a-și extinde teritoriile",
                        rezolvare:
                          "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a susține Antanta",
                      },
                    ],
                    correctAnswer:
                      "România a intrat în Primul Război Mondial în anul 1916",
                  },
                  {
                    id: "2",
                    testID: "1",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    answers: [
                      {
                        text: "România a intrat în Primul Război Mondial de partea Puterilor Antantei",
                        rezolvare:
                          "România a intrat în Primul Război Mondial de partea Puterilor Antantei",
                      },
                      {
                        text: "România a intrat în Primul Război Mondial de partea Puterilor Centrale",
                        rezolvare:
                          "România nu a intrat în Primul Război Mondial de partea Puterilor Centrale",
                      },
                      {
                        text: "Tratatul de la București, a dus la obținerea unor noi teritorii pentru România",
                        rezolvare:
                          "Tratatul de la București, nu a dus la obținerea unor noi teritorii pentru România",
                      },
                      {
                        text: "Romania nu a participat la Primul Război Mondial",
                        rezolvare:
                          "Romania a participat la Primul Război Mondial",
                      },
                    ],
                    correctAnswer:
                      "România a intrat în Primul Război Mondial de partea Puterilor Antantei",
                  },
                  {
                    id: "3",
                    testID: "1",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    answers: [
                      {
                        text: "Principala bătălie în care România a suferit pierderi semnificative în timpul războiului a fost Bătălia de la Turtucaia",
                        rezolvare:
                          "Principala bătălie în care România a suferit pierderi semnificative în timpul războiului a fost Bătălia de la Turtucaia",
                      },
                      {
                        text: "România a intrat în Primul Război Mondial în urma unei invazii surpriză a Puterilor Centrale",
                        rezolvare:
                          "România a intrat în Primul Război Mondial nu în urma unei invazii surpriză a Puterilor Centrale",
                      },
                      {
                        text: "România a intrat în Primul Război Mondial în anul 1914",
                        rezolvare:
                          "România a intrat în Primul Război Mondial în anul 1916",
                      },
                      {
                        text: "Motivul principal pentru intrarea României în Primul Război Mondial a fost sprijinirea Puterilor Centrale",
                        rezolvare:
                          "Motivul principal pentru intrarea României în Primul Război Mondial a fost sprijinirea Antantei",
                      },
                    ],
                    correctAnswer:
                      "Principala bătălie în care România a suferit pierderi semnificative în timpul războiului a fost Bătălia de la Turtucaia",
                  },
                  {
                    id: "4",
                    testID: "1",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    answers: [
                      {
                        text: "România a câștigat o victorie importantă în Bătălia de la Mărăști în 1917",
                        rezolvare:
                          "România a câștigat o victorie importantă în Bătălia de la Mărăști în 1917",
                      },
                      {
                        text: "România a intrat în Primul Război Mondial în anul 1918",
                        rezolvare:
                          "România a intrat în Primul Război Mondial în anul 1916",
                      },
                      {
                        text: "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                        rezolvare:
                          "România a semnat Tratatul de la București, care a pus capăt participării sale în Primul Război Mondial",
                      },
                      {
                        text: "Motivul principal pentru intrarea României în Primul Război Mondial a fost sprijinirea Austro-Ungariei",
                        rezolvare:
                          "Motivul principal pentru intrarea României în Primul Război Mondial nu a fost sprijinirea Austro-Ungariei",
                      },
                    ],
                    correctAnswer:
                      "România a câștigat o victorie importantă în Bătălia de la Mărăști în 1917",
                  },
                  {
                    id: "5",
                    testID: "1",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    answers: [
                      {
                        text: "România a obținut câștiguri teritoriale semnificative în urma Tratatului de la Trianon",
                        rezolvare:
                          "România a obținut câștiguri teritoriale semnificative în urma Tratatului de la Trianon",
                      },
                      {
                        text: "România a semnat Tratatul de la Versailles, care a pus capăt participării sale în Primul Război Mondial",
                        rezolvare:
                          "România a semnat Tratatul de la București, care a pus capăt participării sale în Primul Război Mondial",
                      },
                      {
                        text: "România nu a participat la Primul Război Mondial",
                        rezolvare:
                          "România a participat la Primul Război Mondial",
                      },
                      {
                        text: "România a semnat un armistițiu cu Puterile Centrale în 1917",
                        rezolvare:
                          "România nu a semnat un armistițiu cu Puterile Centrale în 1917",
                      },
                    ],
                    correctAnswer:
                      "România a obținut câștiguri teritoriale semnificative în urma Tratatului de la Trianon",
                  },
                ],
              },
              {
                id: "2",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Stabilește cauzele evenimentelor",
                complexity: "moderat",
                complexityNumber: 2,
                type: "cauze",
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/stabileste-cauzele",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/stabileste-cauzele",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                coloane: ["Lista variantelor", "Cauzele"],
                coloanaRaspuns: "Cauzele",
                quizArray: [
                  {
                    id: "1",
                    testID: "2",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Lista variantelor", "Cauzele"],
                    coloanaRaspuns: "Cauzele",                    
                    cerinte:
                      "Din lista prezentată selectați cauzele I Război Mondial:",
                    answers: [
                      { id: "1", text: "Lupta pentru reîmpărțirea lumii" },
                      {
                        id: "2",
                        text: "Conflictele politice între marile puteri: Germania, Franța, Marea Britanie, Austro-Ungaria și Rusia",
                      },
                      {
                        id: "3",
                        text: "Dezvoltarea economică inegală a marilor puteri de la sf. sec. XIX - începutul sec. XX",
                      },
                      {
                        id: "4",
                        text: "Creșterea rasismului și naționalismului în formele sale extreme",
                      },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "Lupta pentru reîmpărțirea lumii",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "Conflictele politice între marile puteri: Germania, Franța, Marea Britanie, Austro-Ungaria și Rusia",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "Dezvoltarea economică inegală a marilor puteri de la sf. sec. XIX - începutul sec. XX",
                        anul: "1917",
                      },
                    ],
                  },
                  {
                    id: "2",
                    testID: "2",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Lista variantelor", "Cauzele"],
                    coloanaRaspuns: "Cauzele",                    
                    cerinte:
                      "Din lista prezentată selectați cauzele neutralității României la începutil I Război Mondial:",
                    answers: [
                      {
                        id: "1",
                        text: "România a semnat un tratat de neutralitate",
                      },
                      {
                        id: "2",
                        text: "Politica de echilibru a României care se afla la granița dintre două imperii puternice, Rusia și Austro-Ungaria",
                      },
                      {
                        id: "3",
                        text: "Dezvoltarea economică inegală a marilor puteri de la sf. sec. XIX - începutul sec. XX",
                      },
                      {
                        id: "4",
                        text: "Absența unor alianțe clare care să-i ofere Romaniei protecție în război",
                      },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "Dezvoltarea relativ slabă a României din punct de vedere economic și militar",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "Politica de echilibru a României care se afla la granița dintre două imperii puternice, Rusia și Austro-Ungaria",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "Absența unor alianțe clare care să-i ofere Romaniei protecție în război",
                        anul: "1917",
                      },
                    ],
                  },
                ],
              },
              {
                id: "3",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Stabilește consecințele evenimentelor",
                complexity: "moderat",
                complexityNumber: 2,
                type: "consecinte",
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/stabileste-consecintele",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/stabileste-consecintele",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                coloane: ["Lista variantelor", "Consecintele"],
                coloanaRaspuns: "Consecintele",
                quizArray: [
                  {
                    id: "1",
                    testID: "3",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Lista variantelor", "Consecintele"],
                    coloanaRaspuns: "Consecintele",                   
                    cerinte:
                      "Din lista prezentată selectați consecințele I Război Mondial:",
                    answers: [
                      { id: "1", text: "Pierderi umane masive" },
                      { id: "2", text: "Schimbări teritoriale și politice" },
                      {
                        id: "3",
                        text: "Tratatul de la Versailles și instabilitatea postbelică",
                      },
                      {
                        id: "4",
                        text: "Formarea Organizației Națiunilor Unite (ONU)",
                      },
                    ],
                    correctAnswer: [
                      { id: "1", text: "Pierderi umane masive", anul: "1916" },
                      {
                        id: "2",
                        text: "Schimbări teritoriale și politice",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "Tratatul de la Versailles și instabilitatea postbelică",
                        anul: "1917",
                      },
                    ],
                  },
                  {
                    id: "2",
                    testID: "3",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Lista variantelor", "Consecintele"],
                    coloanaRaspuns: "Consecintele",                    
                    cerinte:
                      "Din lista prezentată selectați consecințele intrării Romaniei în I Război Mondial:",
                    answers: [
                      {
                        id: "1",
                        text: "Obținerea teritoriilor din Austro-Ungaria locuite de români",
                      },
                      {
                        id: "2",
                        text: "Conflictele politice între marile puteri: Germania, Franța, Marea Britanie, Austro-Ungaria și Rusia",
                      },
                      {
                        id: "3",
                        text: "Dezvoltarea economică inegală a marilor puteri de la sf. sec. XIX - începutul sec. XX",
                      },
                      {
                        id: "4",
                        text: "Creșterea rasismului și naționalismului în formele sale extreme",
                      },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "Obținerea teritoriilor din Austro-Ungaria locuite de români",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "Conflictele politice între marile puteri: Germania, Franța, Marea Britanie, Austro-Ungaria și Rusia",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "Dezvoltarea economică inegală a marilor puteri de la sf. sec. XIX - începutul sec. XX",
                        anul: "1917",
                      },
                    ],
                  },
                ],
              },

              {
                id: "4",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Verifică corectitudinea afirmațiilor",
                complexity: "simplu",
                complexityNumber: 1,
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/verifica-corectitudinea",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/verifica-corectitudinea",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                coloane: [],
                type: "check",
                quizArray: [
                  {
                    id: "1",
                    testID: "4",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    cerinte: "Persoana reprezentată în imagine:",
                    answers: [
                      {
                        text: "România a intrat în Primul Război Mondial în anul 1916",
                        correct: true,
                        rezolvare:
                          "România a intrat în Primul Război Mondial în anul 1916",
                      },
                      {
                        text: "Regele României în timpul Primului Război Mondial a fost Carol I",
                        correct: false,
                        rezolvare:
                          "Regele României în timpul Primului Război Mondial nu a fost Carol I",
                      },
                      {
                        text: "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                        correct: true,
                        rezolvare:
                          "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                      },
                      {
                        text: "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a-și extinde teritoriile",
                        correct: false,
                        rezolvare:
                          "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a susține Antanta",
                      },
                    ],
                    correctAnswer: "",
                  },
                  {
                    id: "2",
                    testID: "4",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    cerinte: "Persoana reprezentată în imagine:",
                    answers: [
                      {
                        text: "România a intrat în Primul Război Mondial în anul 1916",
                        correct: true,
                        rezolvare:
                          "România a intrat în Primul Război Mondial în anul 1916",
                      },
                      {
                        text: "Regele României în timpul Primului Război Mondial a fost Carol I",
                        correct: false,
                        rezolvare:
                          "Regele României în timpul Primului Război Mondial nu a fost Carol I",
                      },
                      {
                        text: "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                        correct: true,
                        rezolvare:
                          "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                      },
                      {
                        text: "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a-și extinde teritoriile",
                        correct: false,
                        rezolvare:
                          "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a susține Antanta",
                      },
                    ],
                    correctAnswer: "",
                  },
                ],
              },
              {
                id: "5",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Formează perechi logice",
                complexity: "simplu",
                complexityNumber: 1,
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/formeaza-perechi",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/formeaza-perechi",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                type: "snap",
                coloane: [],
                points: [
                  { x: 285, y: 17 },
                  { x: 285, y: 109 },
                  { x: 285, y: 201 },
                  { x: 285, y: 293 },
                  { x: 342, y: 17 },
                  { x: 342, y: 109 },
                  { x: 342, y: 201 },
                  { x: 342, y: 293 },
                ],
                quizArray: [
                  {
                    id: "1",
                    testID: "5",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    cerinte:
                      "Formează perechi logice, unind prin săgeţi, conţinuturile din prima și a doua coloană:",
                    text: [
                      "1. Regele Mihai",
                      "2. Generalul Alexandru Averescu ",
                      "3. Regele Carol II ",
                      "4. Regele Ferdinand I",
                      "A. Instituirea regimului monarhiei autoritare",
                      "B. Prim-ministru al României",
                      "C.'Rege unificator'",
                      "D. Greva regală",
                    ],
                    correctAnswer: [[5, 0], [3, 4], [1, 6], [7, 2]],
                  },
                  {
                    id: "2",
                    testID: "5",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    cerinte:
                      "Formează perechi logice, unind prin săgeţi, conţinuturile din prima și a doua coloană:",
                      text: [
                        "1. Regele Mihai",
                        "2. Generalul Alexandru Averescu ",
                        "3. Regele Carol II ",
                        "4. Regele Ferdinand I",
                        "A. Instituirea regimului monarhiei autoritare",
                        "B. Prim-ministru al României",
                        "C.'Rege unificator'",
                        "D. Greva regală",
                      ],
                      correctAnswer: [[5, 0], [3, 4], [1, 6], [7, 2]],
                  },
                ],
              },

              {
                id: "6",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Grupează elementele",
                complexity: "simplu",
                complexityNumber: 1,
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/grupeaza-elementele",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/grupeaza-elementele",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                type: "group",
                coloane: ["Tarile", "Puterile centrale", "Antanta"],
                coloanaRaspuns: "Antanta",
                coloanaRaspuns1: "Puterile centrale",
                quizArray: [
                  {
                    id: "1",
                    testID: "6",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Tarile", "Puterile centrale", "Antanta"],
                    coloanaRaspuns: "Antanta",
                    coloanaRaspuns1: "Puterile centrale",                    
                    answers: [
                      { id: "1", text: "Germania" },
                      { id: "2", text: "Austro-Ungaria" },
                      { id: "3", text: "Franța" },
                      { id: "4", text: "Imperiul Otoman" },
                      { id: "5", text: "Bulgaria" },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "Franța",
                        text1: "Germania",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "",
                        text1: "Austro-Ungaria",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "",
                        text1: "Imperiul Otoman",
                        anul: "1917",
                      },
                      {
                        id: "4",
                        text: "",
                        text1: "Bulgaria",
                        anul: "24 aprilie 1918",
                      },
                    ],
                    correctAnswerGroup: [
                      {
                        id: "1",
                        text: "Puterile centrale: Germania, Austro-Ungaria, Imporiul Otoman, Bulgaria"
                      },
                      {
                        id: "2",
                        text: "Antanta: Franța"
                      },
                    ]
                  },
                  {
                    id: "2",
                    testID: "6",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Tarile", "Puterile centrale", "Antanta"],
                    coloanaRaspuns: "Antanta",
                    coloanaRaspuns1: "Puterile centrale",                    
                    answers: [
                      { id: "1", text: "Germania" },
                      { id: "2", text: "Austro-Ungaria" },
                      { id: "3", text: "Franța" },
                      { id: "4", text: "Imperiul Otoman" },
                      { id: "5", text: "Bulgaria" },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "Franța",
                        text1: "Germania",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "",
                        text1: "Austro-Ungaria",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "",
                        text1: "Imperiul Otoman",
                        anul: "1917",
                      },
                      {
                        id: "4",
                        text: "",
                        text1: "Bulgaria",
                        anul: "24 aprilie 1918",
                      },
                    ],
                    correctAnswerGroup: [
                      {
                        id: "1",
                        text: "Puterile centrale: Germania, Austro-Ungaria, Imporiul Otoman, Bulgaria"
                      },
                      {
                        id: "2",
                        text: "Antanta: Franța"
                      },
                    ]
                  },
                ],
              },
              {
                id: "7",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Caracteristicile evenimentelor",
                complexity: "moderat",
                complexityNumber: 2,
                type: "caracteristica",
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/caracteristicile-evenimentelor",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/caracteristicile-evenimentelor",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                coloane: ["Lista variantelor", "Caracteristicile"],
                coloanaRaspuns: "Caracteristicile",
                quizArray: [
                  {
                    id: "1",
                    testID: "7",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Lista variantelor", "Caracteristicile"],
                    coloanaRaspuns: "Caracteristicile",
                    cerinte:
                      "Din lista prezentată selectați caracteristicile I Război Mondial:",
                    answers: [
                      { id: "1", text: "Lupta pentru reîmpărțirea lumii" },
                      {
                        id: "2",
                        text: "Conflictele politice între marile puteri: Germania, Franța, Marea Britanie, Austro-Ungaria și Rusia",
                      },
                      {
                        id: "3",
                        text: "Dezvoltarea economică inegală a marilor puteri de la sf. sec. XIX - începutul sec. XX",
                      },
                      {
                        id: "4",
                        text: "Creșterea rasismului și naționalismului în formele sale extreme",
                      },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "Lupta pentru reîmpărțirea lumii",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "Conflictele politice între marile puteri: Germania, Franța, Marea Britanie, Austro-Ungaria și Rusia",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "Dezvoltarea economică inegală a marilor puteri de la sf. sec. XIX - începutul sec. XX",
                        anul: "1917",
                      },
                    ],
                  },
                  {
                    id: "2",
                    testID: "7",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Lista variantelor", "Caracteristicile"],
                    coloanaRaspuns: "Caracteristicile",
                    cerinte:
                      "Din lista prezentată selectați caracteristicile I Război Mondial:",
                    answers: [
                      { id: "1", text: "Lupta pentru reîmpărțirea lumii" },
                      {
                        id: "2",
                        text: "Conflictele politice între marile puteri: Germania, Franța, Marea Britanie, Austro-Ungaria și Rusia",
                      },
                      {
                        id: "3",
                        text: "Dezvoltarea economică inegală a marilor puteri de la sf. sec. XIX - începutul sec. XX",
                      },
                      {
                        id: "4",
                        text: "Creșterea rasismului și naționalismului în formele sale extreme",
                      },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "Lupta pentru reîmpărțirea lumii",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "Conflictele politice între marile puteri: Germania, Franța, Marea Britanie, Austro-Ungaria și Rusia",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "Dezvoltarea economică inegală a marilor puteri de la sf. sec. XIX - începutul sec. XX",
                        anul: "1917",
                      },
                    ],
                  },
                ],
              },
              {
                id: "8",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Completează propoziția",
                complexity: "simplu",
                complexityNumber: 1,
                coloane: [],
                type: "words",
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/completeaza-propozitia",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/completeaza-propozitia",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                quizArray: [
                  {
                    id: "1",
                    testID: "8",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    answers: [
                      {
                        // id: "1",
                        text: "În perioada ;<1914>;-;<1916>; România a fost ;<neutră>;, deși avea un tratat de alianță cu ;<Tripla Alianță>;. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe ;<4 august 1916>;, România a semnat un tratat de alianță cu ;<Antanta>;, care prevedea eliberarea ;<Transilvaniei>; și realizarea unității naționale.",
                        textAdditional: ["1918", "1919"],
                        rezolvare:
                          "În perioada 1914-1916, România a fost neutră, deși avea un tratat de alianță cu Tripla Alianță. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe 4 august 1916, România a semnat un tratat de alianță cu Antanta, care prevedea eliberarea Transilvaniei și realizarea unității naționale.",
                      },
                    ],
                  },
                  {
                    id: "2",
                    testID: "8",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    answers: [
                      {
                        // id: "1",
                        text: "2. Europa de Vest era dominată de 2 state:;<brown>; fox ;<jumped>; over the ;<dog>",
                        textAdditional: ["1918", "1919"],
                        rezolvare:
                          "2. Europa de Vest era dominată de 2 state brown fox jumped over the dog",
                      },
                    ],
                  },
                  // {
                  //   id: "1",
                  //   text: "1. Europa Centrală era dominată de 2 state:;<brown>; fox ;<jumped>; over the ;<dog>",
                  //   rezolvare: "1. Europa Centrală era dominată de 2 state brown fox jumped over the dog",
                  // },
                  // {
                  //   id: "2",
                  //   text: "1. Europa de Vest era dominată de 2 state:;<brown>; fox ;<jumped>; over the ;<dog>",
                  //   rezolvare: "1. Europa Vest era dominată de 2 state brown fox jumped over the dog",
                  // },
                ],
              },
              {
                id: "9",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Elaborează un fragment de text",
                complexity: "dificil",
                complexityNumber: 3,
                type: "chronoDuble",
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/elaboreaza-text",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/elaboreaza-text",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                coloane: ["Evenimentele", "Text in ordine cronoligică"],
                coloanaRaspuns: "Text in ordine cronoligică",
                quizArray: [
                  {
                    id: "1",
                    testID: "9",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Evenimentele", "Text in ordine cronoligică"],
                    coloanaRaspuns: "Text in ordine cronoligică",                    
                    answers: [
                      {
                        id: "1",
                        text: "România a intrat în Primul Război Mondial",
                      },
                      {
                        id: "2",
                        text: "România a semnat Tratatul de la București",
                      },
                      {
                        id: "3",
                        text: "România a câștigat o victorie importantă în Bătălia de la Mărăști",
                      },
                      { id: "4", text: "Ocuparea Bucureștelui" },
                      {
                        id: "5",
                        text: "România a semnat Tratatul de la Versailles, care a pus capăt participării sale în Primul Război Mondial",
                      },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "România a intrat în Primul Război Mondial",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "Ocuparea Bucureștelui",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "România a câștigat o victorie importantă în Bătălia de la Mărăști",
                        anul: "1917",
                      },
                      {
                        id: "4",
                        text: "România a semnat Tratatul de la București",
                        anul: "24 aprilie 1918",
                      },
                    ],
                  },
                  {
                    id: "2",
                    testID: "9",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Evenimentele", "Text in ordine cronoligică"],
                    coloanaRaspuns: "Text in ordine cronoligică",                    
                    answers: [
                      {
                        id: "1",
                        text: "România a intrat în Primul Război Mondial",
                      },
                      {
                        id: "2",
                        text: "România a semnat Tratatul de la București",
                      },
                      {
                        id: "3",
                        text: "România a câștigat o victorie importantă în Bătălia de la Mărăști",
                      },
                      { id: "4", text: "Ocuparea Bucureștelui" },
                      {
                        id: "5",
                        text: "România a semnat Tratatul de la Versailles, care a pus capăt participării sale în Primul Război Mondial",
                      },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "România a intrat în Primul Război Mondial",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "Ocuparea Bucureștelui",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "România a câștigat o victorie importantă în Bătălia de la Mărăști",
                        anul: "1917",
                      },
                      {
                        id: "4",
                        text: "România a semnat Tratatul de la București",
                        anul: "24 aprilie 1918",
                      },
                    ],
                  },
                ],
              },
              {
                id: "10",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Succesiunea cronologică a evenimentelor",
                complexity: "moderat",
                complexityNumber: 2,
                type: "chrono",
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/succesiunea-cronologica",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/succesiunea-cronologica",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                coloane: ["Evenimentele"],
                coloanaRaspuns: "Evenimentele",
                quizArray: [
                  {
                    id: "1",
                    testID: "10",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Evenimentele"],
                    coloanaRaspuns: "Evenimentele",                    
                    answers: [
                      {
                        id: "1",
                        text: "România a intrat în Primul Război Mondial",
                      },
                      {
                        id: "2",
                        text: "România a semnat Tratatul de la București",
                      },
                      {
                        id: "3",
                        text: "România a câștigat o victorie importantă în Bătălia de la Mărăști",
                      },
                      { id: "4", text: "Ocuparea Bucureștelui" },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "România a intrat în Primul Război Mondial",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "Ocuparea Bucureștelui",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "România a câștigat o victorie importantă în Bătălia de la Mărăști",
                        anul: "1917",
                      },
                      {
                        id: "4",
                        text: "România a semnat Tratatul de la București",
                        anul: "24 aprilie 1918",
                      },
                    ],
                  },
                  {
                    id: "2",
                    testID: "10",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    coloane: ["Evenimentele"],
                    coloanaRaspuns: "Evenimentele",
                    answers: [
                      {
                        id: "1",
                        text: "România a intrat în Primul Război Mondial",
                      },
                      {
                        id: "2",
                        text: "România a semnat Tratatul de la București",
                      },
                      {
                        id: "3",
                        text: "România a câștigat o victorie importantă în Bătălia de la Mărăști",
                      },
                      { id: "4", text: "Ocuparea Bucureștelui" },
                    ],
                    correctAnswer: [
                      {
                        id: "1",
                        text: "România a intrat în Primul Război Mondial",
                        anul: "1916",
                      },
                      {
                        id: "2",
                        text: "Ocuparea Bucureștelui",
                        anul: "23 mai 1916",
                      },
                      {
                        id: "3",
                        text: "România a câștigat o victorie importantă în Bătălia de la Mărăști",
                        anul: "1917",
                      },
                      {
                        id: "4",
                        text: "România a semnat Tratatul de la București",
                        anul: "24 aprilie 1918",
                      },
                    ],
                  },
                ],
              },
              {
                id: "11",
                subjectID: "1",
                subtitleID: "1",
                titleID: "1",
                name: "Test de totalizare",
                complexity: "moderat",
                complexityNumber: 2,
                coloane: [],
                path: "/test1",
                addressTestDisciplina: "/matem",
                addressTestSubtitle: "/multimea-numerelor-naturale",
                addressTestSubject:
                  "/mulţimi-operatii-cu-multimi",
                addressTest: "/test-de-totalizare",
                addressTestId:
                  "/mulţimi-operatii-cu-multimi/test-de-totalizare",
                breadcrumb: [
                  { name: "Discipline", path: "/" },
                  { name: "Matematica", path: "/matem" },
                  {
                    name: "Mulțimea numerelor naturale",
                    path: "/matem/multimea-numerelor-naturale",
                  },
                  {
                    name: "Mulţimi.Operaţii cu mulţimi. Mulţimile: N,Z,Q,R.",
                    path: "/matem/multimea-numerelor-naturale/mulţimi-operatii-cu-multimi",
                  },
                ],
                type: "testGeneralizator",
                quizArray: [
                  {
                    id: "1",
                    testID: "11",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    listaSarcini: [
                      {
                        id: "1",
                        type: "check",
                        name: "Bifează afirmațiile corecte",
                        sarcina: "Bifează afirmațiile corecte:",
                        answers: [
                          {
                            text: "România a intrat în Primul Război Mondial în anul 1916",
                            correct: true,
                            rezolvare:
                              "România a intrat în Primul Război Mondial în anul 1916",
                          },
                          {
                            text: "Regele României în timpul Primului Război Mondial a fost Carol I",
                            correct: false,
                            rezolvare:
                              "Regele României în timpul Primului Război Mondial nu a fost Carol I",
                          },
                          {
                            text: "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                            correct: true,
                            rezolvare:
                              "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                          },
                          {
                            text: "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a-și extinde teritoriile",
                            correct: false,
                            rezolvare:
                              "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a susține Antanta",
                          },
                        ],
                      },
                      {
                        id: "2",
                        name: "Consecințele evenimentelor",
                        type: "words",
                        sarcina:
                          "Cum crezi care sunt consecintele corecte ale evenimentului:",
                        answers: [
                          {
                            text: "În perioada ;<1914>;-;<1916>; România a fost ;<neutră>;, deși avea un tratat de alianță cu ;<Tripla Alianță>;. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe ;<4 august 1916>;, România a semnat un tratat de alianță cu ;<Antanta>;, care prevedea eliberarea ;<Transilvaniei>; și realizarea unității naționale.",
                            textAdditional: ["1918", "1919"],
                            rezolvare:
                              "În perioada 1914-1916, România a fost neutră, deși avea un tratat de alianță cu Tripla Alianță. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe 4 august 1916, România a semnat un tratat de alianță cu Antanta, care prevedea eliberarea Transilvaniei și realizarea unității naționale.",
                          },
                        ],
                      },
                      {
                        id: "3",
                        name: "Compune propoziții",
                        type: "words",
                        sarcina: "Completează spațiile libere din propoziții:",
                        answers: [
                          {
                            text: "În perioada ;<1914>;-;<1916>; România a fost ;<neutră>;, deși avea un tratat de alianță cu ;<Tripla Alianță>;. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe ;<4 august 1916>;, România a semnat un tratat de alianță cu ;<Antanta>;, care prevedea eliberarea ;<Transilvaniei>; și realizarea unității naționale.",
                            textAdditional: ["1918", "1919"],
                            rezolvare:
                              "În perioada 1914-1916, România a fost neutră, deși avea un tratat de alianță cu Tripla Alianță. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe 4 august 1916, România a semnat un tratat de alianță cu Antanta, care prevedea eliberarea Transilvaniei și realizarea unității naționale.",
                          },
                        ],
                      },
                      {
                        id: "4",
                        name: "Cronologia evenimentelor",
                        type: "words",
                        sarcina:
                          "Aranjează evenimentele istorice în ordine cronologică:",
                        answers: [
                          {
                            text: "În perioada ;<1914>;-;<1916>; România a fost ;<neutră>;, deși avea un tratat de alianță cu ;<Tripla Alianță>;. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe ;<4 august 1916>;, România a semnat un tratat de alianță cu ;<Antanta>;, care prevedea eliberarea ;<Transilvaniei>; și realizarea unității naționale.",
                            textAdditional: ["1918", "1919"],
                            rezolvare:
                              "În perioada 1914-1916, România a fost neutră, deși avea un tratat de alianță cu Tripla Alianță. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe 4 august 1916, România a semnat un tratat de alianță cu Antanta, care prevedea eliberarea Transilvaniei și realizarea unității naționale.",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "2",
                    testID: "11",
                    subjectID: "1",
                    subtitleID: "1",
                    titleID: "1",
                    listaSarcini: [
                      {
                        id: "1",
                        type: "check",
                        name: "Bifează afirmațiile corecte",
                        sarcina: "Bifează afirmațiile corecte:",
                        answers: [
                          {
                            text: "România a intrat în Primul Război Mondial în anul 1916",
                            correct: true,
                            rezolvare:
                              "România a intrat în Primul Război Mondial în anul 1916",
                          },
                          {
                            text: "Regele României în timpul Primului Război Mondial a fost Carol I",
                            correct: false,
                            rezolvare:
                              "Regele României în timpul Primului Război Mondial nu a fost Carol I",
                          },
                          {
                            text: "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                            correct: true,
                            rezolvare:
                              "România a semnat Tratatul de la Trianon, care a pus capăt participării sale în Primul Război Mondial",
                          },
                          {
                            text: "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a-și extinde teritoriile",
                            correct: false,
                            rezolvare:
                              "Motivul principal pentru intrarea României în Primul Război Mondial a fost dorința de a susține Antanta",
                          },
                        ],
                      },
                      {
                        id: "2",
                        name: "Consecințele evenimentelor",
                        type: "words",
                        sarcina:
                          "Cum crezi care sunt consecintele corecte ale evenimentului:",
                        answers: [
                          {
                            text: "În perioada ;<1914>;-;<1916>; România a fost ;<neutră>;, deși avea un tratat de alianță cu ;<Tripla Alianță>;. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe ;<4 august 1916>;, România a semnat un tratat de alianță cu ;<Antanta>;, care prevedea eliberarea ;<Transilvaniei>; și realizarea unității naționale.",
                            textAdditional: ["1918", "1919"],
                            rezolvare:
                              "În perioada 1914-1916, România a fost neutră, deși avea un tratat de alianță cu Tripla Alianță. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe 4 august 1916, România a semnat un tratat de alianță cu Antanta, care prevedea eliberarea Transilvaniei și realizarea unității naționale.",
                          },
                        ],
                      },
                      {
                        id: "3",
                        name: "Compune propoziții",
                        type: "words",
                        sarcina: "Completează spațiile libere din propoziții:",
                        answers: [
                          {
                            text: "În perioada ;<1914>;-;<1916>; România a fost ;<neutră>;, deși avea un tratat de alianță cu ;<Tripla Alianță>;. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe ;<4 august 1916>;, România a semnat un tratat de alianță cu ;<Antanta>;, care prevedea eliberarea ;<Transilvaniei>; și realizarea unității naționale.",
                            textAdditional: ["1918", "1919"],
                            rezolvare:
                              "În perioada 1914-1916, România a fost neutră, deși avea un tratat de alianță cu Tripla Alianță. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe 4 august 1916, România a semnat un tratat de alianță cu Antanta, care prevedea eliberarea Transilvaniei și realizarea unității naționale.",
                          },
                        ],
                      },
                      {
                        id: "4",
                        name: "Cronologia evenimentelor",
                        type: "words",
                        sarcina:
                          "Aranjează evenimentele istorice în ordine cronologică:",
                        answers: [
                          {
                            text: "În perioada ;<1914>;-;<1916>; România a fost ;<neutră>;, deși avea un tratat de alianță cu ;<Tripla Alianță>;. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe ;<4 august 1916>;, România a semnat un tratat de alianță cu ;<Antanta>;, care prevedea eliberarea ;<Transilvaniei>; și realizarea unității naționale.",
                            textAdditional: ["1918", "1919"],
                            rezolvare:
                              "În perioada 1914-1916, România a fost neutră, deși avea un tratat de alianță cu Tripla Alianță. Au existat dezbateri în țară privind participarea la război, iar în cele din urmă, pe 4 august 1916, România a semnat un tratat de alianță cu Antanta, care prevedea eliberarea Transilvaniei și realizarea unității naționale.",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "2",
            subtitleID: "1",
            titleID: "1",
            name: "Operaţii cu numere naturale",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-naturale",
            addressSubject: "/operatii-cu-numere-naturale",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor naturale",
                path: "/matem/multimea-numerelor-naturale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "2",
                subtitleID: "1",
                titleID: "1",
                name: "Adunarea și scăderea numerelor naturale. Proprietăți",
                raspuns: [{sarcina:"Proprietățile adunării", rezolvare: "<p style='padding:15px;text-indent:20px;'>Adunarea este:<br>• <b>Comutativa</b> - la schimbarea locului termenilor suma nu se schimbă;<br>• <b>Asociativa</b> - oricum am grupa termenii, suma nu se schimbă;<br>• <b>Neutră la 0</b> - adunând un număr cu zero, obținem același număr.</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/NumereNaturaleAddPropr.jpg",
                  "/images/NumereNaturaleScadPropr.jpg",
                ],
               },
               {
                id: "2",
                subjectID: "2",
                subtitleID: "1",
                titleID: "1",
                name: "Înmulțirea numerelor naturale. Proprietăți. Factorul comun.",
                raspuns: [{sarcina:"Proprietățile înmulțirii", rezolvare: "<p style='padding:15px;text-indent:20px;'>Înmulțirea este:<br>• <b>Comutativa</b> - La schimbarea locului factorilor produsul nu se schimbă;<br>• <b>Asociativa</b> - Oricum am grupa factorii, produsul nu se schimbă;<br>• <b>Neutră la 1</b> - Înmulțind un număr cu 1, obținem același număr;<br>• <b>Distribuitivă față de adunare</b> - Pentru a înmulți un număr cu o sumă, putem înmulți numărul cu fiecare termen al sumei, apoi să adunăm produsele obținute;<br>• <b>Distribuitivă față de scădere</b> - Pentru a înmulți un număr cu o diferență, putem înmulți numărul cu descăzutul și cu scăzătorul, apoi să scădem produsele obținute.</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/NumereNaturaleImnultPropr.jpg",
                  "/images/NumereNaturaleImnultTehnica.jpg",
                ],
               },
               {
                id: "3",
                subjectID: "2",
                subtitleID: "1",
                titleID: "1",
                name: "Puterea cu exponent număr natural. Proprietăți.",
                raspuns: [{sarcina:"Proprietățile puterii cu exponent natural", rezolvare: "<p style='padding:15px;'>• <b>Înmulțirea puterilor cu aceeași bază</b> - scriem baza și adunăm exponenții;<br>• <b>Împărțirea puterilor cu aceeași bază</b> - scriem baza și scădem exponenții;<br>• <b>Puterea unei puteri</b> - scriem baza și înmulțim exponenții;<br>• <b>Ridicare la putere a unui produs</b> - ridicăm fiecare factor la puterea respectivă.</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/NumereNaturalePuterePropr.jpg",
                  "/images/NumereNaturalePutereCub.jpg",
                ],
               },
               {
                id: "4",
                subjectID: "2",
                subtitleID: "1",
                titleID: "1",
                name: "Împărțirea numerelor naturale. Împărțirea cu rest.",
                raspuns: [{sarcina:"Teorema împărțirii cu rest", rezolvare: "<p style='padding:15px;'>Oricare ar fi numerele naturale <b>a</b> și <b>b</b>, există 2 numere naturale <b>c</b> și <b>r</b>, numite respective cât și rest, care satisfac condițiile:<br><b>a = c × b + r, unde  r > b</b></p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/NumereNaturaleImpartire.jpg",
                  "/images/NumereNaturaleImpRest.jpg",
                  "/images/NumereNaturaleImpTehnica.jpg",
                ],
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "2",  
                   subtitleID: "1",
                   titleID: "1" 
              }]
            }],
          },

          {
            id: "3",
            subtitleID: "1",
            titleID: "1",
            name: "Divizibilitate în N. Criteriile de divizibilitate cu 2, 3, 5, 9, 10.",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-naturale",
            addressSubject: "/divizibilitate",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor naturale",
                path: "/matem/multimea-numerelor-naturale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "3",
                subtitleID: "1",
                titleID: "1",
                name: "Divizor. Mulțimea divizorilor unui număr natural",
                raspuns: [{sarcina:"Definiția divizorului", rezolvare: "<p style='padding:15px;'>Numărul A este <b>divizor</b> al numărului natural C, dacă există numărul natural B astfel, încât A×B = C<br>Numărul natural nenul A este <b>divizor</b> al numărului C, dacă C se împarte exact la A.</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/DivizorDef.jpg",
                ],                
               },
               {
                id: "2",
                subjectID: "3",
                subtitleID: "1",
                titleID: "1",
                name: "Multiplu. Mulțimea multiplilor unui număr natural.",
                raspuns: [{sarcina:"Definiția numărului multiplu", rezolvare: "<p style='padding:15px;'>Numărul natural C este <b>multiplu</b> al numărului natural A, dacă C se împarte exact la A</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/MultipluDef.jpg",
                ],                
               },
               {
                id: "3",
                subjectID: "3",
                subtitleID: "1",
                titleID: "1",
                name: "Numere prime, numere compuse.",
                raspuns: [{sarcina:"Definește numerele prime, numerele compuse", rezolvare: "<p style='padding:15px 15px 5px;text-indent:20px;'><b>Numere prime</b> sunt numerele naturale > 1 care au doar 2 divizori pozitivi: 1 și ele însuși.<br>Exemplu: 2, 3, 5, 7, 11, 13, 17, etc</p><p style='padding:5px 15px 15px;text-indent:20px;'><b>Numere compuse</b> sunt numerele naturale > 1 care au mai mulți divizori pozitivi în afară de 1 și el însuși.<br>Exemplu: 4, 6, 8, 9, etc</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/NumerePrimeCompuse.jpg",
                ],                
               },
               {
                id: "4",
                subjectID: "3",
                subtitleID: "1",
                titleID: "1",
                name: "Criteriile de divizibilitate cu 2, 3, 5, 9, 10. Numere pare, impare.",
                raspuns: [{sarcina:"Criteriile de divizibilitate cu 2, 3, 5, 9, 10", rezolvare: "<p style='padding:15px 15px 5px;text-indent:20px;'>Un număr este divizibil cu:<br><b>2</b> - dacă ultima cifră este 0,2,4,6,8;<br><b>5</b> - dacă ultima cifră este 0,5;<br><b>10</b> - dacă ultima cifră este 0;<br><b>3</b> - dacă suma cifrelor sale este divizibilă cu 3;<br><b>9</b> - dacă suma cifrelor sale este divizibilă cu 9;</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/CriteriiDivizibilitate.jpg",
                  "/images/NumerePareImpare.jpg",
                ],                
               },
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "3",  
                   subtitleID: "1",
                   titleID: "1" 
              }]
            }],
          },
          {
            id: "4",
            subtitleID: "1",
            titleID: "1",
            name: "Cel mai mare divizor comun al două numere naturale.",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-naturale",
            addressSubject: "/cel-mai-mare-divizor-comun",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor naturale",
                path: "/matem/multimea-numerelor-naturale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "4",
                subtitleID: "1",
                titleID: "1",
                name: "Descompunerea numerelor naturale în produs de puteri de numere prime.",
                raspuns: [{sarcina:"Etapele descompunerii numărului în produs de factori primi", rezolvare: "<p style='padding:15px;'>1) Identificăm cel mai mic divizor prim al numărului;<br>2) Împărțim numărul la acest divizor;<br>3) Identificăm cel mai mic divizor prim al câtului obținut;<br>4) Împărțim câtul la acest divizor;<br>5) Repetăm acești pași până obținem câtul 1;<br>6) Descompunerea numărului în factori primi este egală cu produsul divizorilor identificați.</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/DescompunereFactori.jpg",
                ],
               },
               {
                id: "2",
                subjectID: "4",
                subtitleID: "1",
                titleID: "1",
                name: "Divizor comun al două numere naturale. C.m.m.d.c. al două numere naturale.",
                raspuns: [{sarcina:"Cel mai mare divizor comun al numerelor naturale", rezolvare: "<p style='padding:15px;'><b>Cel mai mare divizor comun</b> al numerelor naturale a și b este cel mai mare număr natural care se împarte exact la fiecare dintre numerele a și b.<br> Se calculează ca un produs de  factorilor comuni la puterea cea mai mică<br>Se notează: (a,b)</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/CMMDivizorComun.jpg",
                ],
               },
               {
                id: "3",
                subjectID: "4",
                subtitleID: "1",
                titleID: "1",
                name: "Numere prime între ele.",
                raspuns: [{sarcina:"Numere prime între ele", rezolvare: "<p style='padding:15px;'><b>Numere prime</b> - numerele care au cel mai mare divizor comun pe 1.<br>Se notează: (a,b) = 1</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/PrimeInreEle.jpg",
                ],
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "4",  
                   subtitleID: "1",
                   titleID: "1" 
              }]
            }],
          },
          {
            id: "5",
            subtitleID: "1",
            titleID: "1",
            name: "Cel mai mic multiplu comun al două numere naturale.",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-naturale",
            addressSubject: "/cel-mai-mic-multiplu-comun",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor naturale",
                path: "/matem/multimea-numerelor-naturale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "5",
                subtitleID: "1",
                titleID: "1",
                name: "Multipli comuni ai două numere naturale.",
                raspuns: [{sarcina:"Multipli comuni ai două numere naturale", rezolvare: "<p style='padding:15px;'><b>Multipli comuni ai două numere naturale</b> - mulțimea numerelor care aparțin intersecției multimii multiplilor fiecărui număr respectiv.</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/MultipliComuni.jpg",
                ],
               },
               {
                id: "2",
                subjectID: "5",
                subtitleID: "1",
                titleID: "1",
                name: "C.m.m.m.c. al două numere naturale.",
                raspuns: [{sarcina:"Cel mai mic multiplu comun al numerelor naturale", rezolvare: "<p style='padding:15px;'><b>Cel mai mic multiplu comun</b> al numerelor naturale a și b - este cel mai mic număr natural nenul la care se împarte exact fiecare dintre numerele a și b.<br>Se notează: [a,b]</p>"}],
                audio: "/sound/audio-joiner1_31.mp3",
                images: [
                  "/images/CMMMultipluComun.jpg",
                ],
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "5",  
                   subtitleID: "1",
                   titleID: "1" 
              }]
            }],
          },
        ],
        diagramData: [
          {
            text: "Mulțimea numerelor naturale",
            modal: "Mulțimea numerelor naturale",
            image: "/images/pretext1.png",
            children: [
              {
                text: "1914: Primul Război Mondial izbucnește în Balcani",
                modal:
                  "La 28 iunie 1914, Arhiducele Franz Ferdinand, moștenitorul tronului austro-ungar, a fost asasinat în Sarajevo. Austro-Ungaria a declarat război Serbiei.",
                image: "/images/pretext1.png",
                children: [
                  {
                    text: "România rămâne neutră",
                    modal: "România rămâne neutră",
                    image: "/images/pretext1.png",
                    children: [],
                  },
                  {
                    text: "4 august 1916: alianța cu Antanta",
                    modal: "4 august 1916: alianța cu Antanta",
                    image: "/images/pretext1.png",
                    children: [],
                  },
                ],
              },
              {
                text: "15 august 1916: România intră în război",
                modal: "15 august 1916: România intră în război",
                image: "/images/pretext1.png",
                children: [
                  {
                    text: "Înfrângerea în fața armatei Puterilor Centrale",
                    modal: "Înfrângerea în fața armatei Puterilor Centrale",
                    image: "/images/pretext1.png",
                    children: [
                      {
                        text: "23 mai 1916: ocuparea Bucureștelui",
                        modal: "23 mai 1916: ocuparea Bucureștelui",
                        image: "/images/pretext1.png",
                        children: [
                          {
                            text: "Regele și guvernul se retrag la Iași",
                            modal: "Regele și guvernul se retrag la Iași",
                            image: "/images/pretext1.png",
                            children: [
                              {
                                text: "2/3 din România sunt ocupate",
                                modal: "2/3 din România sunt ocupate",
                                image: "/images/pretext1.png",
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                text: "1917: reorganizarea armaiei române",
                modal: "1917: reorganizarea armaiei române",
                image: "/images/pretext1.png",
                children: [
                  {
                    text: "Victorii la Mărăști, Mărășești, Oituz",
                    modal: "Victorii la Mărăști, Mărășești, Oituz",
                    image: "/images/pretext1.png",
                    children: [],
                  },
                ],
              },
              {
                text: "octombrie 1917: revoluția bolșevică din Rusia",
                modal: "octombrie 1917: revoluția bolșevică din Rusia",
                image: "/images/pretext1.png",
                children: [
                  {
                    text: "Armata țaristă se destramă",
                    modal: "Armata țaristă se destramă",
                    image: "/images/pretext1.png",
                    children: [
                      {
                        text: "Rusia încheie armistițiu cu Puterile Centrale",
                        modal: "Rusia încheie armistițiu cu Puterile Centrale",
                        image: "/images/pretext1.png",
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                text: "24 aprilie 1918: România capitulează",
                modal: "24 aprilie 1918: România capitulează",
                image: "/images/pretext1.png",
                children: [
                  {
                    text: "Cedarea Dobrogei și Munților Carpați",
                    modal: "Cedarea Dobrogei și Munților Carpați",
                    image: "/images/pretext1.png",
                    children: [],
                  },
                  {
                    text: "Concesionarea petrolului, gazului și pădurilor",
                    modal: "Concesionarea petrolului, gazului și pădurilor",
                    image: "/images/pretext1.png",
                    children: [],
                  },
                ],
              },
              {
                text: "28 octombrie 1918: România reîntră în război de partea Antantei",
                modal:
                  "28 octombrie 1918: România reîntră în război de partea Antantei",
                image: "/images/pretext1.png",
                children: [
                  {
                    text: "29 octombrie 1918: Germania încheie armistițiu cu Antanta",
                    modal:
                      "29 octombrie 1918: Germania încheie armistițiu cu Antanta",
                    image: "/images/pretext1.png",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "1",
            titleID: "1",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-naturale",
            addressSubject: "/examen-subiect1",
            addressAplicatie: "/multimea-numerelor-naturale/examen-subiect1",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor naturale",
                path: "/matem/multimea-numerelor-naturale",
              },
            ],
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "1",
                titleID: "1",
                cerinte: [
                  "Studiază coperta cărții. Numește un fapt istoric pe care autorul îl poate utiliza pentru a justifica titlul cărții. Argumentează răspunsul.",
                ],
                img: "/images/carte_planul_marshall.jpg",
                procent_paper: "70%",
                forma: [
                  {
                    cerinte:
                      "Numește un fapt istoric pe care autorul îl poate utiliza pentru a justifica titlul cărții (nu uita să indici data).",
                    hint: [],
                  },
                  {
                    cerinte: "Argumentează răspunsul cu referire la copertă.",
                    hint: [
                      "denumirea cărții face trimitere la...",
                      "în imagine vedem...",
                    ],
                  },
                ],
                raspuns: [
                  "Fapt istoric: semnarea Pactului Molotov-Ribentrop din 23 august 1939",
                  'Argument: pe coperta cărții se vede denumirea "Pactului Molotov-Ribentrop", iar pe fotografie se văd semnatarii acestui document - Molotov și Ribentrop',
                ],
                barem: {
                  maxPoints: 3,
                  subitems: [
                    {
                      nameSubItem: "Numește..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns greșit/ lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label: "1 p. - răspuns corect",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Argumentează..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns greșit/lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - argumentare parțială, fără invocarea unor exemple/dovezi",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - argumentare deplină, cu exemple invocate din sursă sau din cunoștințele obținute anterior",
                          subPoint: 2,
                        },
                      ],
                    },
                  ],
                },
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "1",
                titleID: "1",
                cerinte: [
                  "Studiază coperta cărții. Numește un fapt istoric pe care autorul îl poate utiliza pentru a justifica titlul cărții. Argumentează răspunsul.",
                ],
                img: "/images/carte_planul_marshall.jpg",
                procent_paper: "70%",
                forma: [
                  {
                    cerinte:
                      "Numește un fapt istoric pe care autorul îl poate utiliza pentru a justifica titlul cărții (nu uita să indici data).",
                    hint: [],
                  },
                  {
                    cerinte: "Argumentează răspunsul cu referire la copertă.",
                    hint: [
                      "denumirea cărții face trimitere la...",
                      "în imagine vedem...",
                    ],
                  },
                ],
                raspuns: [
                  "Fapt istoric: semnarea Pactului Molotov-Ribentrop din 23 august 1939",
                  'Argument: pe coperta cărții se vede denumirea "Pactului Molotov-Ribentrop", iar pe fotografie se văd semnatarii acestui document - Molotov și Ribentrop',
                ],
                barem: {
                  maxPoints: 3,
                  subitems: [
                    {
                      nameSubItem: "Numește..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns greșit/ lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label: "1 p. - răspuns corect",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Argumentează..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns greșit/lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - argumentare parțială, fără invocarea unor exemple/dovezi",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - argumentare deplină, cu exemple invocate din sursă sau din cunoștințele obținute anterior",
                          subPoint: 2,
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "1",
            titleID: "1",
            complexity: "dificil",
            complexityNumber: 3,
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-naturale",
            addressSubject: "/examen-subiect2",
            addressAplicatie: "/multimea-numerelor-naturale/examen-subiect2",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor naturale",
                path: "/matem/multimea-numerelor-naturale",
              },
            ],
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "1",
                titleID: "1",
                cerinte: [
                  "Studiază materialul suport și realizează sarcinile propuse.",
                ],
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursa A și cunoștințele obținute anterior.",
                    cerinte: [
                      "Identifică două evenimente importante pentru evoluția regimurilor totalitare în perioada interbelică.",
                      "",
                    ],
                    harta: "/images/Romania_1938.png",
                    forma: [
                      {
                        cerinte: "Primul eveniment important",
                        hint: [],
                      },
                      {
                        cerinte: "Al doilea eveniment important",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "două evenimente importante pentru evoluția regimurilor totalitare în perioada interbelică",
                    raspuns_harta: "/images/Romania_1938.png",
                    barem: {
                      maxPoints: 2,
                      subitems: [
                        {
                          nameSubItem: "Identifică I eveniment..",
                          maxSubPoints: 1,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label: "1 p. - răspuns corect",
                              subPoint: 1,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Identifică II eveniment..",
                          maxSubPoints: 1,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără invocarea unor exemple/dovezi",
                              subPoint: 1,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursele A, C și cunoștințele obținute anterior.",
                    cerinte: [
                      "Formulează o cauză a instaurării regimurilor totalitare din perioada interbelică.",
                      "",
                    ],
                    harta: "",
                    forma: [
                      {
                        cerinte: "Cauza",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "cauză a instaurării regimurilor totalitare din perioada interbelică",
                    raspuns_harta: "",
                    barem: {
                      maxPoints: 2,
                      subitems: [
                        {
                          nameSubItem: "Formulează..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - formularea unei cauze parțiale; doar selectare din sursă",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - formularea unei cauze depline în baza sursei sau a cunoștințelor anterioare",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursa D și cunoștințele obținute anterior.",
                    cerinte: ["Explică termenul Izolaționism.", ""],
                    harta: "/images/Romania_1938.png",
                    forma: [
                      {
                        cerinte: "Explicația",
                        hint: [],
                      },
                    ],
                    raspuns: "termenul Izolaționism.",
                    raspuns_harta: "/images/Romania_1938.png",
                    barem: {
                      maxPoints: 2,
                      subitems: [
                        {
                          nameSubItem: "Explică..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - explicație parțială, în baza unor indicii din sursă",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - explicație deplină menționând aspectele esențiale ale sensului termenului",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursa B și cunoștințele obținute anterior.",
                    cerinte: [
                      "Explică scopul luptei de emancipare a femeilor în perioada interbelică.",
                      "",
                    ],
                    harta: "",
                    forma: [
                      {
                        cerinte: "Scopul",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "scopul luptei de emancipare a femeilor în perioada interbelică.",
                    raspuns_harta: "",
                    barem: {
                      maxPoints: 3,
                      subitems: [
                        {
                          nameSubItem: "Explică scopul..",
                          maxSubPoints: 3,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label: "1 p. - răspuns simplist/declarativ",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - explicație parțială în baza opiniei personale asupra sarcinii, fără a valorifica informația din sursă",
                              subPoint: 2,
                            },
                            {
                              value: 4,
                              label:
                                "3 p. - explicație deplină - reflectă esența faptului istoric analizat și valorifică informația din sursă",
                              subPoint: 3,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursele A, B și cunoștințele obținute anterior.",
                    cerinte: [
                      "Determină două consecințe ale menținerii regimurilor democratice în perioada interbelică. Explică răspunsul.",
                      "",
                    ],
                    harta: "",
                    forma: [
                      {
                        cerinte: "Consecința 1:",
                        hint: [],
                      },
                      {
                        cerinte: "Consecința 2:",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "două consecințe ale menținerii regimurilor democratice în perioada interbelică",
                    raspuns_harta: "",
                    barem: {
                      maxPoints: 4,
                      subitems: [
                        {
                          nameSubItem: "Prima consecință..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - determină consecința corect; selectează din sursă sau din cunoștințele anterioare fără a explica",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - determină consecința corect; selectează din sursă sau din cunoștințele anterioare și oferă o explicație pertinentă",
                              subPoint: 2,
                            },
                          ],
                        },
                        {
                          nameSubItem: "A doua consecință..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - determină consecința corect; selectează din sursă sau din cunoștințele anterioare fără a explica",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - determină consecința corect; selectează din sursă sau din cunoștințele anterioare și oferă o explicație pertinentă",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursa D și cunoștințele obținute anterior.",
                    cerinte: [
                      "Numește o personalitate istorică ce a condus SUA în perioada celui de-al Doilea Război Mondial. Argumentează, în două idei, rolul acestei personalități în istorie.",
                      "",
                    ],
                    harta: "",
                    forma: [
                      {
                        cerinte: "Personalitatea:",
                        hint: [],
                      },
                      {
                        cerinte: "Rolul 1:",
                        hint: [],
                      },
                      {
                        cerinte: "Rolul 2:",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "personalitate istorică ce a condus SUA în perioada celui de-al Doilea Război Mondial",
                    raspuns_harta: "",
                    barem: {
                      maxPoints: 5,
                      subitems: [
                        {
                          nameSubItem: "Numește..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label: "1 p. - numește corect personalitatea",
                              subPoint: 1,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Argumenteaza - I idee..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă sau în discordanță cu opinia exprimată",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără invocarea unor exemple",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - argumentare deplină, cu exemple invocate, corecte din punct de vedere științific",
                              subPoint: 2,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Argumenteaza - II idee..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă sau în discordanță cu opinia exprimată",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără invocarea unor exemple",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - argumentare deplină, cu exemple invocate, corecte din punct de vedere științific",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa: "",
                    cerinte: [
                      "Exprimă-ți opinia:",
                      "Formulează două argumente.",
                    ],
                    harta: "",
                    afirmatia:
                      "Regimurile totalitare interbelice aveau trăsături comune?",
                    forma: [
                      {
                        cerinte: "Opinia:",
                        hint: [],
                      },
                      {
                        cerinte: "Argumentul 1:",
                        hint: [],
                      },
                      {
                        cerinte: "Argumentul 2:",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "Regimurile totalitare interbelice aveau trăsături comune",
                    raspuns_harta: "",
                    barem: {
                      maxPoints: 5,
                      subitems: [
                        {
                          nameSubItem: "Exprimă opinia..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă/ neexplicit (nu este posibil a identifica opinia)",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label: "1 p. - apreciere explicit formulată",
                              subPoint: 1,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Argumenteaza - I argument..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă sau în discordanță cu opinia exprimată",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără a face trimitere la suportul propus sau a valorifica cunoștințelor obținute anterior",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - argumentare deplină (raționament și exemplu), corectă științific, în concordanță cu opinia exprimată, valorifică suportul sau cunoștințele obținute anterior",
                              subPoint: 2,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Argumenteaza - II argument..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă sau în discordanță cu opinia exprimată",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără a face trimitere la suportul propus sau a valorifica cunoștințelor obținute anterior",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - argumentare deplină (raționament și exemplu), corectă științific, în concordanță cu opinia exprimată, valorifică suportul sau cunoștințele obținute anterior",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],

                sursa: [
                  {
                    title: "SURSA A. REPERE CRONOLOGICE",
                    content: [
                      "1922 - Marșul fasciștilor italieni spre Roma",
                      "1926 - Formarea guvernului Unității Naționale a Franței în frunte cu R. Poincare",
                      "1928 - Reforma electorală în Marea Britanie prin care femeile au primit dreptul la vot",
                      "1929 - 1933 - Marea criză economică",
                      "1933 - Numirea lui Adolf Hitler în postul de cancelar al Germaniei",
                      "1939 - Începutul celui de-al Doilea Război Mondial",
                    ],
                    author: "",
                    sursaText: "",
                  },
                  {
                    title: "SURSA B.",
                    content: [
                      '"În statele democratice din perioada interbelică a funcţionat principiul separarării puterilor. Parlamentarismul a continuat să fie o trăsătură caracteristică importantă în aceste ţări. Sistemul lor politic era pluripartit şi erau organizate alegeri libere, pe baza votului universal. Libertatea presei şi respectarea drepturilor cetăţenilor au fost alte trăsături ale regimurilor democratice. Perioada interbelică a fost marcată şi de lupta de emancipare a femeilor, care s-au implicat în viaţa economică. Totuşi, doar în unele ţări acestea au obţinut drepturi politice egale cu bărbaţii. În anii 1922-1928, lumea a cunoscut o perioadă de dezvoltare economică. Marea criză economică (1929-1933) a putut fi depăşită prin aplicarea unor politici economice complexe."',
                    ],
                    author: "Pierre Milza, Serge Bernstein",
                    sursaText: "Istoria secolului XX ,Bucureşti, 1998, vol.I",
                  },
                  {
                    title: "SURSA C.",
                    content: [
                      '"Regimurile politice totalitare au fost opuse celor democratice. Regimurile totalitare aveau trăsături comune. Ideologia comunistă susţinea că reprezentă interesele proletariatului, dar, în realitate, era dictatura partidului comunist, a nomenclaturii. Cea fascistă accentua rolul statului şi supunerea indivizilor faţă de acesta, iar naţional-socialismul era o ideologie naţionalistă, rasistă şi antisemită. În cadrul regimurilor de extremă-dreaptă, apărute ca reacţie la comunism, economia de piaţă a continuat să existe, dar statul intervenea în cadrul ei, pentru a controla tensiunile sociale."',
                    ],
                    author: "Ewan Murray",
                    sursaText: "Shut Up: Tale of Totalitarianism, 2005",
                  },
                  {
                    title: "SURSA D.",
                    content: [
                      '"Dacă primul mandat a lui Roosevelt a fost absorbit de criză, al doilea mandat a fost dominat de probleme internaționale. La început, conștient de atașamentul americanilor față de izolaționism, Roosevelt lasă Congresul să voteze legea neutralității (1935). Apoi, neliniștit de agresiunea germană, italiană și japoneză, amenință aceste țări cu punerea în carantină (1937)[...] Roosevelt refuză totuși să ajute Franța sfâșiată și slăbită, în 1940[...]. Reales în 1940 cu o majoritate redusă, decide să ajute Marea Britanie, rămasă singură în luptă, făcând Congresul să voteze legea armamentului (Lend-Lease), extinsă în 1941 și la URSS, angajând industria americană în producția de război."',
                    ],
                    author: "Dominique Vallaud",
                    sursaText: "Dicționar istoric, București, 2008",
                  },
                ],
              },
              {
                id: "2",
                subiect: "2",
                subtitleID: "1",
                titleID: "1",
                cerinte: [
                  "Studiază materialul suport și realizează sarcinile propuse2",
                ],
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursa A și cunoștințele obținute anterior.",
                    cerinte: [
                      "Identifică două evenimente importante pentru evoluția regimurilor totalitare în perioada interbelică.",
                      "",
                    ],

                    forma: [
                      {
                        cerinte: "Primul eveniment important",
                        hint: [],
                      },
                      {
                        cerinte: "Al doilea eveniment important",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "două evenimente importante pentru evoluția regimurilor totalitare în perioada interbelică",
                    barem: {
                      maxPoints: 2,
                      subitems: [
                        {
                          nameSubItem: "Identifică I eveniment..",
                          maxSubPoints: 1,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label: "1 p. - răspuns corect",
                              subPoint: 1,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Identifică II eveniment..",
                          maxSubPoints: 1,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără invocarea unor exemple/dovezi",
                              subPoint: 1,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursele A, C și cunoștințele obținute anterior.",
                    cerinte: [
                      "Formulează o cauză a instaurării regimurilor totalitare din perioada interbelică.",
                      "",
                    ],
                    forma: [
                      {
                        cerinte: "Cauza",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "cauză a instaurării regimurilor totalitare din perioada interbelică",
                    barem: {
                      maxPoints: 2,
                      subitems: [
                        {
                          nameSubItem: "Formulează..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - formularea unei cauze parțiale; doar selectare din sursă",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - formularea unei cauze depline în baza sursei sau a cunoștințelor anterioare",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursa D și cunoștințele obținute anterior.",
                    cerinte: ["Explică termenul Izolaționism.", ""],
                    forma: [
                      {
                        cerinte: "Explicația",
                        hint: [],
                      },
                    ],
                    raspuns: "termenul Izolaționism.",
                    barem: {
                      maxPoints: 2,
                      subitems: [
                        {
                          nameSubItem: "Explică..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - explicație parțială, în baza unor indicii din sursă",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - explicație deplină menționând aspectele esențiale ale sensului termenului",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursa B și cunoștințele obținute anterior.",
                    cerinte: [
                      "Explică scopul luptei de emancipare a femeilor în perioada interbelică.",
                      "",
                    ],
                    forma: [
                      {
                        cerinte: "Scopul",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "scopul luptei de emancipare a femeilor în perioada interbelică.",
                    barem: {
                      maxPoints: 3,
                      subitems: [
                        {
                          nameSubItem: "Explică scopul..",
                          maxSubPoints: 3,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label: "1 p. - răspuns simplist/declarativ",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - explicație parțială în baza opiniei personale asupra sarcinii, fără a valorifica informația din sursă",
                              subPoint: 2,
                            },
                            {
                              value: 4,
                              label:
                                "3 p. - explicație deplină - reflectă esența faptului istoric analizat și valorifică informația din sursă",
                              subPoint: 3,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursele A, B și cunoștințele obținute anterior.",
                    cerinte: [
                      "Determină două consecințe ale menținerii regimurilor democratice în perioada interbelică. Explică răspunsul.",
                      "",
                    ],
                    forma: [
                      {
                        cerinte: "Consecința 1:",
                        hint: [],
                      },
                      {
                        cerinte: "Consecința 2:",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "două consecințe ale menținerii regimurilor democratice în perioada interbelică",
                    barem: {
                      maxPoints: 4,
                      subitems: [
                        {
                          nameSubItem: "Prima consecință..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - determină consecința corect; selectează din sursă sau din cunoștințele anterioare fără a explica",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - determină consecința corect; selectează din sursă sau din cunoștințele anterioare și oferă o explicație pertinentă",
                              subPoint: 2,
                            },
                          ],
                        },
                        {
                          nameSubItem: "A doua consecință..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - determină consecința corect; selectează din sursă sau din cunoștințele anterioare fără a explica",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - determină consecința corect; selectează din sursă sau din cunoștințele anterioare și oferă o explicație pertinentă",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa:
                      "Utilizează sursa D și cunoștințele obținute anterior.",
                    cerinte: [
                      "Numește o personalitate istorică ce a condus SUA în perioada celui de-al Doilea Război Mondial. Argumentează, în două idei, rolul acestei personalități în istorie.",
                      "",
                    ],
                    forma: [
                      {
                        cerinte: "Personalitatea:",
                        hint: [],
                      },
                      {
                        cerinte: "Rolul 1:",
                        hint: [],
                      },
                      {
                        cerinte: "Rolul 2:",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "personalitate istorică ce a condus SUA în perioada celui de-al Doilea Război Mondial",
                    barem: {
                      maxPoints: 5,
                      subitems: [
                        {
                          nameSubItem: "Numește..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label: "0 p. - răspuns greșit/ lipsă",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label: "1 p. - numește corect personalitatea",
                              subPoint: 1,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Argumenteaza - I idee..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă sau în discordanță cu opinia exprimată",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără invocarea unor exemple",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - argumentare deplină, cu exemple invocate, corecte din punct de vedere științific",
                              subPoint: 2,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Argumenteaza - II idee..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă sau în discordanță cu opinia exprimată",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără invocarea unor exemple",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - argumentare deplină, cu exemple invocate, corecte din punct de vedere științific",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "1",
                    titleID: "1",
                    sursa: "",
                    cerinte: [
                      "Exprimă-ți opinia:",
                      "Formulează două argumente.",
                    ],
                    afirmatia:
                      "Regimurile totalitare interbelice aveau trăsături comune?",
                    forma: [
                      {
                        cerinte: "Opinia:",
                        hint: [],
                      },
                      {
                        cerinte: "Argumentul 1:",
                        hint: [],
                      },
                      {
                        cerinte: "Argumentul 2:",
                        hint: [],
                      },
                    ],
                    raspuns:
                      "Regimurile totalitare interbelice aveau trăsături comune",
                    barem: {
                      maxPoints: 5,
                      subitems: [
                        {
                          nameSubItem: "Exprimă opinia..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă/ neexplicit (nu este posibil a identifica opinia)",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label: "1 p. - apreciere explicit formulată",
                              subPoint: 1,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Argumenteaza - I argument..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă sau în discordanță cu opinia exprimată",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără a face trimitere la suportul propus sau a valorifica cunoștințelor obținute anterior",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - argumentare deplină (raționament și exemplu), corectă științific, în concordanță cu opinia exprimată, valorifică suportul sau cunoștințele obținute anterior",
                              subPoint: 2,
                            },
                          ],
                        },
                        {
                          nameSubItem: "Argumenteaza - II argument..",
                          maxSubPoints: 2,
                          options: [
                            {
                              value: 1,
                              label:
                                "0 p. - răspuns lipsă sau în discordanță cu opinia exprimată",
                              subPoint: 0,
                            },
                            {
                              value: 2,
                              label:
                                "1 p. - argumentare parțială, fără a face trimitere la suportul propus sau a valorifica cunoștințelor obținute anterior",
                              subPoint: 1,
                            },
                            {
                              value: 3,
                              label:
                                "2 p. - argumentare deplină (raționament și exemplu), corectă științific, în concordanță cu opinia exprimată, valorifică suportul sau cunoștințele obținute anterior",
                              subPoint: 2,
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],

                sursa: [
                  {
                    title: "SURSA A. REPERE CRONOLOGICE",
                    content: [
                      "1922 - Marșul fasciștilor italieni spre Roma",
                      "1926 - Formarea guvernului Unității Naționale a Franței în frunte cu R. Poincare",
                      "1928 - Reforma electorală în Marea Britanie prin care femeile au primit dreptul la vot",
                      "1929 - 1933 - Marea criză economică",
                      "1933 - Numirea lui Adolf Hitler în postul de cancelar al Germaniei",
                      "1939 - Începutul celui de-al Doilea Război Mondial",
                    ],
                    author: "",
                    sursaText: "",
                  },
                  {
                    title: "SURSA B.",
                    content: [
                      '"În statele democratice din perioada interbelică a funcţionat principiul separarării puterilor. Parlamentarismul a continuat să fie o trăsătură caracteristică importantă în aceste ţări. Sistemul lor politic era pluripartit şi erau organizate alegeri libere, pe baza votului universal. Libertatea presei şi respectarea drepturilor cetăţenilor au fost alte trăsături ale regimurilor democratice. Perioada interbelică a fost marcată şi de lupta de emancipare a femeilor, care s-au implicat în viaţa economică. Totuşi, doar în unele ţări acestea au obţinut drepturi politice egale cu bărbaţii. În anii 1922-1928, lumea a cunoscut o perioadă de dezvoltare economică. Marea criză economică (1929-1933) a putut fi depăşită prin aplicarea unor politici economice complexe."',
                    ],
                    author: "Pierre Milza, Serge Bernstein",
                    sursaText: "Istoria secolului XX ,Bucureşti, 1998, vol.I",
                  },
                  {
                    title: "SURSA C.",
                    content: [
                      '"Regimurile politice totalitare au fost opuse celor democratice. Regimurile totalitare aveau trăsături comune. Ideologia comunistă susţinea că reprezentă interesele proletariatului, dar, în realitate, era dictatura partidului comunist, a nomenclaturii. Cea fascistă accentua rolul statului şi supunerea indivizilor faţă de acesta, iar naţional-socialismul era o ideologie naţionalistă, rasistă şi antisemită. În cadrul regimurilor de extremă-dreaptă, apărute ca reacţie la comunism, economia de piaţă a continuat să existe, dar statul intervenea în cadrul ei, pentru a controla tensiunile sociale."',
                    ],
                    author: "Ewan Murray",
                    sursaText: "Shut Up: Tale of Totalitarianism, 2005",
                  },
                  {
                    title: "SURSA D.",
                    content: [
                      '"Dacă primul mandat a lui Roosevelt a fost absorbit de criză, al doilea mandat a fost dominat de probleme internaționale. La început, conștient de atașamentul americanilor față de izolaționism, Roosevelt lasă Congresul să voteze legea neutralității (1935). Apoi, neliniștit de agresiunea germană, italiană și japoneză, amenință aceste țări cu punerea în carantină (1937)[...] Roosevelt refuză totuși să ajute Franța sfâșiată și slăbită, în 1940[...]. Reales în 1940 cu o majoritate redusă, decide să ajute Marea Britanie, rămasă singură în luptă, făcând Congresul să voteze legea armamentului (Lend-Lease), extinsă în 1941 și la URSS, angajând industria americană în producția de război."',
                    ],
                    author: "Dominique Vallaud",
                    sursaText: "Dicționar istoric, București, 2008",
                  },
                ],
              },
            ],
          },
          {
            id: "3",
            subtitleID: "1",
            titleID: "1",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-naturale",
            addressSubject: "/examen-subiect3",
            addressAplicatie: "/multimea-numerelor-naturale/examen-subiect3",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor naturale",
                path: "/matem/multimea-numerelor-naturale",
              },
            ],
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "1",
                titleID: "1",                
                cerinte: [
                  "Studiază sursele A-C",
                  "Utilizează sursele pentru a argumenta, într-un text coerent, afirmația:",
                ],
                forma: [
                  {
                    cerinte: "Introducere",
                    hint: [],
                  },
                  {
                    cerinte: "Cuprins. I argument",
                    hint: [],
                  },
                  {
                    cerinte: "Cuprins. II argument",
                    hint: [],
                  },
                  {
                    cerinte: "Cuprins. III argument",
                    hint: [],
                  },
                  {
                    cerinte: "Incheiere",
                    hint: [],
                  },
                ],
                afirmatia:
                  "Reforma agrară din 1921 a contribuit la modernizarea societății românești.",
                nota: [
                  "Notă: În elaborarea textului vei :",
                  "- folosi sursele propuse;",
                  "- respecta coerența textului cu structura: introducere, cuprins, concluzie;",
                  "- formula cel puțin trei argumente;",
                  "- utiliza în argumentare referințe cu privire la personalități sau repere cronologice;",
                  "- formula un mesaj corect din punct de vedere științific.",
                ],
                sursa: [
                  {
                    title: "SURSA A.",
                    content: [
                      '"Articolul II. […] proprietățile ce sunt expuse exproprierii trec asupra statului, libere de orice obligațiuni sau orice sarcini de orice natură.',
                      "Articolul III. Se vor expropria în întregime: a) Proprietățile imobiliare (rurale, urbane) ce aparțin haznalei (statului), udelurilor (coroanei), băncilor țărănești și mănăstirilor din străinătate; b) Proprietățile imobiliare rurale ale supușilor străini […].",
                      'Articolul V. Se vor expropria pământurile mănăstirilor locale, lăsându-se fiecărei mănăstiri câte 50 ha pământ cultivabil, viile și grădinile de pomi roditori."',
                    ],
                    author: "",
                    sursaText:
                      "(Din Legea de reformă agrară pentru Basarabia, votată de Parlamentul României la 11 martie 1920)",
                  },
                  {
                    title: "SURSA B.",
                    content: [
                      '"Specificul reformei agrare basarabene a constat nu atât în prevederile legislației agrare, cât în aplicarea acetora. Mecanismul de aplicare a fost unul greoi, din cauza dificitului de pământ și a numărului mare de țărani cu drept de împroprietărire, dar și a lipsei unui cadru legislativ, prin aplicarea căruia statul să sprijine proaspătul proprietar […]. În Basarabia au fost expropriate de fapt pământurile ocupate cu forța de țărani în urma mișcărilor țărănești din anii 1917-1918, care, în final, urmau să devină proprietatea de drept și de fapt. Lotul de împroprietărire în Basarabia a fost mai mic decât prevedea legea, din cauza insuficienței acute de pământ și a cererii ridicate pentru acesta comparativ cu alte regiuni ale României"',
                    ],
                    author: "Svetlana Suveică",
                    sursaText:
                      "Basarabia în primul deceniu interbelic (1918-1929). Modernizare prin reforme.",
                  },
                  {
                    title: "SURSA C.",
                    content: [
                      '"Cu toată rentabilitatea redusă a loturilor, cu toate dificultăţile şi lipsurile prin care avea să treacă ţărănimea mai târziu, situaţia materială a țăranilor a început să se schimbe. În câţiva ani de zile după război au dispărut acoperişurile de paie care mai existau ici-colo înainte de împroprietărire. Mulţi ţărani îşi trimiteau copiii la şcoli în oraşe şi o generaţie nouă de intelectuali se ridica din sate. Erau urmările pozitive ale acestei reforme."',
                    ],
                    author: "Alexandra Georgescu",
                    sursaText:
                      "Cum s-a aplicat reforma agrară din 1921// Adevărul.ro",
                  },
                ],
                img: "/images/carte_planul_marshall.jpg",
                raspuns: [
                  "Fapt istoric: semnarea Pactului Molotov-Ribentrop din 23 august 1939",
                  'Argument: pe coperta cărții se vede denumirea "Pactului Molotov-Ribentrop", iar pe fotografie se văd semnatarii acestui document - Molotov și Ribentrop',
                ],
                barem: {
                  maxPoints: 15,
                  subitems: [
                    {
                      nameSubItem: "Utilizează sursele..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label:
                            "0 p. - răspuns lipsă sau fără a face trimitere la surse",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - se fac unele încercări de valorificare a surselor; textul surselor este preluat fără a fi integrat în text",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - sursele sunt parte integră a textului, servesc ca suport al reflecției autorului",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Întroducere..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - întroducere corect formulată, clar organizată ca mesaj/ structură",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Cuprins..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - Cuprins corect formulat, clar organizat ca mesaj/ structură",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Concluzie..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - Concluzie corect formulată, clar organizată ca mesaj/ structură",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Relevanța argumentelor..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label:
                            "0 p. - răspuns lipsă sau sunt doar enumerate informații disparate din surse",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - argumentele care reflectă explicit afirmația propusă",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Argumenteaza - I argument..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label: "1 p. - argument parțial/declarativ",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - argument deplin (raționament și exemplu)",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Argumenteaza - II argument..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label: "1 p. - argument parțial/declarativ",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - argument deplin (raționament și exemplu)",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Argumenteaza - III argument..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label: "1 p. - argument parțial/declarativ",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - argument deplin (raționament și exemplu)",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Referințe date/personalități..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - referințele sunt parțial relevante pentru tema propusă",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - refrințele sunt relevante pentru prezentarea temei",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Corect științific..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label:
                            "0 p. - răspuns lipsă/ volum irelevant (2-3 enunțuri)",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - nu sunt comise greșeli științifice grave",
                          subPoint: 1,
                        },
                      ],
                    },
                  ],
                },
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "1",
                titleID: "1",
                cerinte: [
                  "Studiază sursele A-C",
                  "Utilizează sursele pentru a argumenta, într-un text coerent, afirmația:",
                ],
                forma: [
                  {
                    cerinte: "Introducere",
                    hint: [],
                  },
                  {
                    cerinte: "Cuprins. I argument",
                    hint: [],
                  },
                  {
                    cerinte: "Cuprins. II argument",
                    hint: [],
                  },
                  {
                    cerinte: "Cuprins. III argument",
                    hint: [],
                  },
                  {
                    cerinte: "Incheiere",
                    hint: [],
                  },
                ],
                afirmatia:
                  "Reforma agrară din 1921 a contribuit la modernizarea societății românești.",
                nota: [
                  "Notă: În elaborarea textului vei :",
                  "- folosi sursele propuse;",
                  "- respecta coerența textului cu structura: introducere, cuprins, concluzie;",
                  "- formula cel puțin trei argumente;",
                  "- utiliza în argumentare referințe cu privire la personalități sau repere cronologice;",
                  "- formula un mesaj corect din punct de vedere științific.",
                ],
                sursa: [
                  {
                    title: "SURSA A.",
                    content: [
                      '"Articolul II. […] proprietățile ce sunt expuse exproprierii trec asupra statului, libere de orice obligațiuni sau orice sarcini de orice natură.',
                      "Articolul III. Se vor expropria în întregime: a) Proprietățile imobiliare (rurale, urbane) ce aparțin haznalei (statului), udelurilor (coroanei), băncilor țărănești și mănăstirilor din străinătate; b) Proprietățile imobiliare rurale ale supușilor străini […].",
                      'Articolul V. Se vor expropria pământurile mănăstirilor locale, lăsându-se fiecărei mănăstiri câte 50 ha pământ cultivabil, viile și grădinile de pomi roditori."',
                    ],
                    author: "",
                    sursaText:
                      "(Din Legea de reformă agrară pentru Basarabia, votată de Parlamentul României la 11 martie 1920)",
                  },
                  {
                    title: "SURSA B.",
                    content: [
                      '"Specificul reformei agrare basarabene a constat nu atât în prevederile legislației agrare, cât în aplicarea acetora. Mecanismul de aplicare a fost unul greoi, din cauza dificitului de pământ și a numărului mare de țărani cu drept de împroprietărire, dar și a lipsei unui cadru legislativ, prin aplicarea căruia statul să sprijine proaspătul proprietar […]. În Basarabia au fost expropriate de fapt pământurile ocupate cu forța de țărani în urma mișcărilor țărănești din anii 1917-1918, care, în final, urmau să devină proprietatea de drept și de fapt. Lotul de împroprietărire în Basarabia a fost mai mic decât prevedea legea, din cauza insuficienței acute de pământ și a cererii ridicate pentru acesta comparativ cu alte regiuni ale României"',
                    ],
                    author: "Svetlana Suveică",
                    sursaText:
                      "Basarabia în primul deceniu interbelic (1918-1929). Modernizare prin reforme.",
                  },
                  {
                    title: "SURSA C.",
                    content: [
                      '"Cu toată rentabilitatea redusă a loturilor, cu toate dificultăţile şi lipsurile prin care avea să treacă ţărănimea mai târziu, situaţia materială a țăranilor a început să se schimbe. În câţiva ani de zile după război au dispărut acoperişurile de paie care mai existau ici-colo înainte de împroprietărire. Mulţi ţărani îşi trimiteau copiii la şcoli în oraşe şi o generaţie nouă de intelectuali se ridica din sate. Erau urmările pozitive ale acestei reforme."',
                    ],
                    author: "Alexandra Georgescu",
                    sursaText:
                      "Cum s-a aplicat reforma agrară din 1921// Adevărul.ro",
                  },
                ],
                img: "/images/carte_planul_marshall.jpg",
                raspuns: [
                  "Fapt istoric: semnarea Pactului Molotov-Ribentrop din 23 august 1939",
                  'Argument: pe coperta cărții se vede denumirea "Pactului Molotov-Ribentrop", iar pe fotografie se văd semnatarii acestui document - Molotov și Ribentrop',
                ],
                barem: {
                  maxPoints: 15,
                  subitems: [
                    {
                      nameSubItem: "Utilizează sursele..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label:
                            "0 p. - răspuns lipsă sau fără a face trimitere la surse",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - se fac unele încercări de valorificare a surselor; textul surselor este preluat fără a fi integrat în text",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - sursele sunt parte integră a textului, servesc ca suport al reflecției autorului",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Întroducere..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - întroducere corect formulată, clar organizată ca mesaj/ structură",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Cuprins..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - Cuprins corect formulat, clar organizat ca mesaj/ structură",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Concluzie..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - Concluzie corect formulată, clar organizată ca mesaj/ structură",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Relevanța argumentelor..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label:
                            "0 p. - răspuns lipsă sau sunt doar enumerate informații disparate din surse",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - argumentele care reflectă explicit afirmația propusă",
                          subPoint: 1,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Argumenteaza - I argument..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label: "1 p. - argument parțial/declarativ",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - argument deplin (raționament și exemplu)",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Argumenteaza - II argument..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label: "1 p. - argument parțial/declarativ",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - argument deplin (raționament și exemplu)",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Argumenteaza - III argument..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label: "1 p. - argument parțial/declarativ",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - argument deplin (raționament și exemplu)",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Referințe date/personalități..",
                      maxSubPoints: 2,
                      options: [
                        {
                          value: 1,
                          label: "0 p. - răspuns lipsă",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - referințele sunt parțial relevante pentru tema propusă",
                          subPoint: 1,
                        },
                        {
                          value: 3,
                          label:
                            "2 p. - refrințele sunt relevante pentru prezentarea temei",
                          subPoint: 2,
                        },
                      ],
                    },
                    {
                      nameSubItem: "Corect științific..",
                      maxSubPoints: 1,
                      options: [
                        {
                          value: 1,
                          label:
                            "0 p. - răspuns lipsă/ volum irelevant (2-3 enunțuri)",
                          subPoint: 0,
                        },
                        {
                          value: 2,
                          label:
                            "1 p. - nu sunt comise greșeli științifice grave",
                          subPoint: 1,
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        ],
        repere: [
          {
            id: "1",
            name: "27 august 1916 - România a intrat în război de partea Antantei",
            anul: "27 august 1916",
            eveniment: "România a intrat în război de partea Antantei",
            img: "/images/abstract01.jpg",
            detaliiPath: "/subtema1",
          },
          {
            id: "2",
            name: "6/19 august 1917 - bătălia de la Marasesti",
            anul: "6/19 august 1917",
            eveniment: "Bătălia de la Mărășești",
            img: "/images/abstract02.jpg",
            detaliiPath: "/subtema1",
          },
        ],
        termeni: [
          {
            id: "1",
            name: "Neutralitate - Politica unui stat de a nu se implica în conflict militar, păstrându-și suveranitatea și independența",
            anul: "Neutralitate",
            eveniment:
              "Politica unui stat de a nu se implica în conflict militar, păstrându-și suveranitatea și independența",
            img: "/images/abstract01.jpg",
            detaliiPath: "/subtema1",
          },
          {
            id: "2",
            name: "Armistițiu - suspendare temporară a acțiunilor militare",
            anul: "Armistițiu",
            eveniment: "Suspendare temporară a acțiunilor militare",
            img: "/images/abstract02.jpg",
            detaliiPath: "/subtema1",
          },
        ],
      },
      {
        id: "2",
        name: "Mulțimea numerelor întregi.",
        addressDisciplina: "/matem",
        address: "/multimea-numerelor-intregi",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "6",
            subtitleID: "2",
            titleID: "1",
            name: "Revigorarea luptei pentru autonomia Basarabiei din primăvara anului 1917",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-intregi",
            addressSubject: "/revigorarea-luptei-pentru-autonomia-basarabiei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor întregi.",
                path: "/matem/multimea-numerelor-intregi",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "6",
                subtitleID: "2",
                titleID: "1"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "6",  
                   subtitleID: "2",
                   titleID: "1" 
              }]
            }],
          },
          {
            id: "7",
            subtitleID: "2",
            titleID: "1",
            name: "Evoluția mișcării naționale în vara anului 1917",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-intregi",
            addressSubject: "/evolutia-miscarii-nationale",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor întregi.",
                path: "/matem/multimea-numerelor-intregi",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "7",
                subtitleID: "2",
                titleID: "1"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "7",  
                   subtitleID: "2",
                   titleID: "1" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "2",
            titleID: "1",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "2",
                titleID: "1",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "2",
                titleID: "1",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "2",
            titleID: "1",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "2",
                titleID: "1",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "2",
                titleID: "1",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "2",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "2",
            titleID: "1",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "2",
                titleID: "1", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "2",
                titleID: "1",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "3",
        name: "Mulțimea numerelor raționale",
        addressDisciplina: "/matem",
        address: "/multimea-numerelor-rationale",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "8",
            subtitleID: "3",
            titleID: "1",
            name: "Republica Democratică Moldovenească în lupta cu anarhia",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-rationale",
            addressSubject:
              "/republica-democratica-moldoveneasca-in-lupta-cu-anarhia",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor raționale",
                path: "/matem/multimea-numerelor-rationale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "8",
                subtitleID: "3",
                titleID: "1"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "8",  
                   subtitleID: "3",
                   titleID: "1" 
              }]
            }],
          },
          {
            id: "9",
            subtitleID: "3",
            titleID: "1",
            name: "Declararea de independență a Republicii Democratice Moldovenești",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-rationale",
            addressSubject: "/independenta-republicii-democratice-moldovenesti",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor raționale",
                path: "/matem/multimea-numerelor-rationale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "9",
                subtitleID: "3",
                titleID: "1"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "9",  
                   subtitleID: "3",
                   titleID: "1" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "3",
            titleID: "1",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "3",
                titleID: "1",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "3",
                titleID: "1",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "3",
            titleID: "1",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "3",
                titleID: "1",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "3",
                titleID: "1",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "3",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "3",
            titleID: "1",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "3",
                titleID: "1", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "3",
                titleID: "1",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "4",
        name: "Mulțimea numerelor reale",
        addressDisciplina: "/matem",
        address: "/multimea-numerelor-reale",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "10",
            subtitleID: "4",
            titleID: "1",
            name: "Conferința de Pace de la Paris (1919-1920)",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-reale",
            addressSubject: "/conferinta-de-pace-de-la-paris-din-1919-1920",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor reale",
                path: "/matem/multimea-numerelor-reale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "10",
                subtitleID: "4",
                titleID: "1"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "10",  
                   subtitleID: "4",
                   titleID: "1" 
              }]
            }],
          },
          {
            id: "11",
            subtitleID: "4",
            titleID: "1",
            name: "Tratatul de la Saint-Germain",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/multimea-numerelor-reale",
            addressSubject: "/tratatul-de-la-saint-germain",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mulțimea numerelor reale",
                path: "/matem/multimea-numerelor-reale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "11",
                subtitleID: "4",
                titleID: "1"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "11",  
                   subtitleID: "4",
                   titleID: "1" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "4",
            titleID: "1",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "4",
                titleID: "1",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "4",
                titleID: "1",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "4",
            titleID: "1",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "4",
                titleID: "1",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "4",
                titleID: "1",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "4",
                    titleID: "1",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "4",
            titleID: "1",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "4",
                titleID: "1", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "4",
                titleID: "1",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]        
      },
    ],
  },
  {
    id: "2",
    title: "Rapoarte şi proporţii",
    disciplina: "Matematica",
    ciclul: "Ciclul gimnazial",
    subtitles: [
      {
        id: "5",
        name: "Rapoarte. Proporţii. Proprietatea fundamentală a proporţiilor.",
        addressDisciplina: "/matem",
        address: "/rapoarte-proportii",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "12",
            subtitleID: "5",
            titleID: "2",
            name: "SUA după Primul Război Mondial",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/rapoarte-proportii",
            addressSubject: "/sua-dupa-primul-razboi-mondial",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Rapoarte. Proporţii. Proprietatea fundamentală a proporţiilor.",
                path: "/matem/rapoarte-proportii",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "12",
                subtitleID: "5",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "12",  
                   subtitleID: "5",
                   titleID: "2" 
              }]
            }],
          },
          {
            id: "13",
            subtitleID: "5",
            titleID: "2",
            name: "Marea criză economică și consecințele ei",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/rapoarte-proportii",
            addressSubject: "/marea-criza-economica",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Rapoarte. Proporţii. Proprietatea fundamentală a proporţiilor.",
                path: "/matem/rapoarte-proportii",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "13",
                subtitleID: "5",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "13",  
                   subtitleID: "5",
                   titleID: "2" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "5",
            titleID: "2",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "5",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "5",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "5",
            titleID: "2",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "5",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "5",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "5",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "5",
            titleID: "2",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "5",
                titleID: "2", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "5",
                titleID: "2",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "6",
        name: "Mărimi direct proporţionale şi mărimi invers proporţionale",
        addressDisciplina: "/matem",
        address: "/marimi-direct-invers-proportionale",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "14",
            subtitleID: "6",
            titleID: "2",
            name: "Viața politică în Marea Britanie în anii 20-30 ai secolului XX-lea",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/marimi-direct-invers-proportionale",
            addressSubject: "/viata-politica-in-marea-britanie",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mărimi direct proporţionale şi mărimi invers proporţionale",
                path: "/matem/marimi-direct-invers-proportionale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "14",
                subtitleID: "6",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "14",  
                   subtitleID: "6",
                   titleID: "2" 
              }]
            }],
          },
          {
            id: "15",
            subtitleID: "6",
            titleID: "2",
            name: "Rivalitatea pentru putere dintre partidele politice în Franța",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/marimi-direct-invers-proportionale",
            addressSubject: "/viata-politica-in-franta",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Mărimi direct proporţionale şi mărimi invers proporţionale",
                path: "/matem/marimi-direct-invers-proportionale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "15",
                subtitleID: "6",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "15",  
                   subtitleID: "6",
                   titleID: "2" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "6",
            titleID: "2",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "6",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "6",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "6",
            titleID: "2",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "6",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "6",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "6",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "6",
            titleID: "2",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "6",
                titleID: "2", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "6",
                titleID: "2",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "7",
        name: "Regula de trei simplă",
        addressDisciplina: "/matem",
        address: "/regula-de-trei-simpla",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "16",
            subtitleID: "7",
            titleID: "2",
            name: "Dezvoltarea economiei României în anii 1918-1940",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/regula-de-trei-simpla",
            addressSubject: "/dezvoltarea-economiei-româniei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Regula de trei simplă",
                path: "/matem/regula-de-trei-simpla",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "16",
                subtitleID: "7",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "16",  
                   subtitleID: "7",
                   titleID: "2" 
              }]
            }],
          },
          {
            id: "17",
            subtitleID: "7",
            titleID: "2",
            name: "Minoritățile etnice în România",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/regula-de-trei-simpla",
            addressSubject: "/minoritatile-etnice-in-romania",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Regula de trei simplă",
                path: "/matem/regula-de-trei-simpla",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "17",
                subtitleID: "7",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "17",  
                   subtitleID: "7",
                   titleID: "2" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "7",
            titleID: "2",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "7",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "7",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "7",
            titleID: "2",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "7",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "7",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "7",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "7",
            titleID: "2",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "7",
                titleID: "2", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "7",
                titleID: "2",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "8",
        name: "Procente. Aflarea % dintr-un număr dat. Aflarea unui număr din %.",
        addressDisciplina: "/matem",
        address: "/procente",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "18",
            subtitleID: "8",
            titleID: "2",
            name: "Specificul dezvoltării social-economice a Basarabiei",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/procente",
            addressSubject: "/dezvoltarea-social-economica-a-basarabiei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Procente",
                path: "/matem/procente",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "18",
                subtitleID: "8",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "18",  
                   subtitleID: "8",
                   titleID: "2" 
              }]
            }],
          },
          {
            id: "19",
            subtitleID: "8",
            titleID: "2",
            name: "Minoritățile etnice în Basarabia",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/procente",
            addressSubject: "/minoritatile-etnice-in-basarabia",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Procente",
                path: "/matem/procente",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "19",
                subtitleID: "8",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "19",  
                   subtitleID: "8",
                   titleID: "2" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "8",
            titleID: "2",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "8",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "8",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "8",
            titleID: "2",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "8",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "8",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "8",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "8",
            titleID: "2",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "8",
                titleID: "2", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "8",
                titleID: "2",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "9",
        name: "Media aritmetică",
        addressDisciplina: "/matem",
        address: "/media-aritmetică",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "20",
            subtitleID: "9",
            titleID: "2",
            name: "Formarea RASSM",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/media-aritmetică",
            addressSubject: "/formarea-rassm",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Media aritmetică",
                path: "/matem/media-aritmetică",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "20",
                subtitleID: "9",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "20",  
                   subtitleID: "9",
                   titleID: "2" 
              }]
            }],
          },
          {
            id: "21",
            subtitleID: "9",
            titleID: "2",
            name: "Represiunile staliniste",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/media-aritmetică",
            addressSubject: "/represiunile-staliniste",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Media aritmetică",
                path: "/matem/media-aritmetică",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "21",
                subtitleID: "9",
                titleID: "2"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "21",  
                   subtitleID: "9",
                   titleID: "2" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "9",
            titleID: "2",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "9",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "9",
                titleID: "2",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "9",
            titleID: "2",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "9",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "9",
                titleID: "2",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "9",
                    titleID: "2",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "9",
            titleID: "2",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "9",
                titleID: "2", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "9",
                titleID: "2",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
    ],
  },
  {
    id: "3",
    title: "Calcul algebric.",
    disciplina: "Matematica",
    ciclul: "Ciclul gimnazial",
    subtitles: [
      {
        id: "10",
        name: "Operaţii cu numere reale reprezentate prin litere.",
        addressDisciplina: "/matem",
        address: "/operatii-cu-numere-reale",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "26",
            subtitleID: "10",
            titleID: "3",
            name: "Expansiunea Germaniei",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/operatii-cu-numere-reale",
            addressSubject: "/expansiunea-germaniei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Operaţii cu numere reale reprezentate prin litere.",
                path: "/matem/operatii-cu-numere-reale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "26",
                subtitleID: "10",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "26",  
                   subtitleID: "10",
                   titleID: "3" 
              }]
            }],
          },
          {
            id: "27",
            subtitleID: "10",
            titleID: "3",
            name: "Agresiunea italiană în Etiopia",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/operatii-cu-numere-reale",
            addressSubject: "/agresiunea-italiana-in-etiopia",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Operaţii cu numere reale reprezentate prin litere.",
                path: "/matem/operatii-cu-numere-reale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "27",
                subtitleID: "10",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "27",  
                   subtitleID: "10",
                   titleID: "3" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "10",
            titleID: "3",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "10",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "10",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "10",
            titleID: "3",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "10",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "10",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "10",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "10",
            titleID: "3",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "10",
                titleID: "3", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "10",
                titleID: "3",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "11",
        name: "Formule de calcul prescurtat.",
        addressDisciplina: "/matem",
        address: "/formule-de-calcul-prescurtat",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "28",
            subtitleID: "11",
            titleID: "3",
            name: "Problema basarabeană în relațiile româno-sovietice în anul 1924",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/formule-de-calcul-prescurtat",
            addressSubject: "/problema-basarabeana",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Relațiie sovieto-române(1918-1940)",
                path: "/matem/formule-de-calcul-prescurtat",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "28",
                subtitleID: "11",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "28",  
                   subtitleID: "11",
                   titleID: "3" 
              }]
            }],
          },
          {
            id: "29",
            subtitleID: "11",
            titleID: "3",
            name: "Tezaurul României aflat la Moscova",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/formule-de-calcul-prescurtat",
            addressSubject: "/tezaurul-romaniei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Relațiie sovieto-române(1918-1940)",
                path: "/matem/formule-de-calcul-prescurtat",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "29",
                subtitleID: "11",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "29",  
                   subtitleID: "11",
                   titleID: "3" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "11",
            titleID: "3",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "11",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "11",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "11",
            titleID: "3",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "11",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "11",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "11",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "11",
            titleID: "3",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "11",
                titleID: "3", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "11",
                titleID: "3",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "12",
        name: "Metode de descompunere în factori.",
        addressDisciplina: "/matem",
        address: "/descompunere-in-factori",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "30",
            subtitleID: "12",
            titleID: "3",
            name: "Raptul Basarabiei",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/descompunere-in-factori",
            addressSubject: "/raptul-basarabiei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Pierderile teritoriale ale României din 1940",
                path: "/matem/descompunere-in-factori",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "30",
                subtitleID: "12",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "30",  
                   subtitleID: "12",
                   titleID: "3" 
              }]
            }],
          },
          {
            id: "31",
            subtitleID: "12",
            titleID: "3",
            name: "Raptul Bucovinei de Nord",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/descompunere-in-factori",
            addressSubject: "/raptul-bucovinei-de-nord",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Pierderile teritoriale ale României din 1940",
                path: "/matem/descompunere-in-factori",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "31",
                subtitleID: "12",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "31",  
                   subtitleID: "12",
                   titleID: "3" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "12",
            titleID: "3",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "12",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "12",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "12",
            titleID: "3",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "12",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "12",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "12",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "12",
            titleID: "3",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "12",
                titleID: "3", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "12",
                titleID: "3",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "13",
        name: "Transformări identice ale expresiilor algebrice.",
        addressDisciplina: "/matem",
        address: "/transformari-identice",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "32",
            subtitleID: "13",
            titleID: "3",
            name: "Crearea RSSM și politica de ocupație sovietică",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/transformari-identice",
            addressSubject: "/crearea-rssm",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Transformări identice ale expresiilor algebrice.",
                path: "/matem/transformari-identice",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "32",
                subtitleID: "13",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "32",  
                   subtitleID: "13",
                   titleID: "3" 
              }]
            }],
          },
          {
            id: "33",
            subtitleID: "13",
            titleID: "3",
            name: "Dictatul de la Viena și Tratatul de la Craiova",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/transformari-identice",
            addressSubject: "/dictatul-de-la-viena",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Transformări identice ale expresiilor algebrice.",
                path: "/matem/transformari-identice",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "33",
                subtitleID: "13",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "33",  
                   subtitleID: "13",
                   titleID: "3" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "13",
            titleID: "3",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "13",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "13",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "13",
            titleID: "3",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "13",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "13",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "13",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "13",
            titleID: "3",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "13",
                titleID: "3", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "13",
                titleID: "3",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "14",
        name: "Rapoarte (fracții) algebrice, DVA",
        addressDisciplina: "/matem",
        address: "/rapoarte-algebrice",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "32",
            subtitleID: "14",
            titleID: "3",
            name: "Crearea RSSM și politica de ocupație sovietică",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/rapoarte-algebrice",
            addressSubject: "/crearea-rssm",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Formarea RSSM",
                path: "/matem/rapoarte-algebrice",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "32",
                subtitleID: "14",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "32",  
                   subtitleID: "14",
                   titleID: "3" 
              }]
            }],
          },
          {
            id: "33",
            subtitleID: "14",
            titleID: "3",
            name: "Dictatul de la Viena și Tratatul de la Craiova",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/rapoarte-algebrice",
            addressSubject: "/dictatul-de-la-viena",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Formarea RSSM",
                path: "/matem/rapoarte-algebrice",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "33",
                subtitleID: "14",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "33",  
                   subtitleID: "14",
                   titleID: "3" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "14",
            titleID: "3",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "14",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "14",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "14",
            titleID: "3",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "14",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "14",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "14",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "14",
            titleID: "3",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "14",
                titleID: "3", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "14",
                titleID: "3",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "15",
        name: "Identitate. Expresii identic egale",
        addressDisciplina: "/matem",
        address: "/identitate-expresii-identic-egale",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "32",
            subtitleID: "15",
            titleID: "3",
            name: "Crearea RSSM și politica de ocupație sovietică",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/identitate-expresii-identic-egale",
            addressSubject: "/crearea-rssm",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Formarea RSSM",
                path: "/matem/identitate-expresii-identic-egale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "32",
                subtitleID: "15",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "32",  
                   subtitleID: "15",
                   titleID: "3" 
              }]
            }],
          },
          {
            id: "33",
            subtitleID: "15",
            titleID: "3",
            name: "Dictatul de la Viena și Tratatul de la Craiova",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/identitate-expresii-identic-egale",
            addressSubject: "/dictatul-de-la-viena",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Formarea RSSM",
                path: "/matem/identitate-expresii-identic-egale",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "33",
                subtitleID: "15",
                titleID: "3"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "33",  
                   subtitleID: "15",
                   titleID: "3" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "15",
            titleID: "3",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "15",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "15",
                titleID: "3",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "15",
            titleID: "3",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "15",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "15",
                titleID: "3",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "15",
                    titleID: "3",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "15",
            titleID: "3",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "15",
                titleID: "3", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "15",
                titleID: "3",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
    ],
  },
  {
    id: "4",
    title: "Funcţii.",
    disciplina: "Matematica",
    ciclul: "Ciclul gimnazial",
    subtitles: [
      {
        id: "16",
        name: "Coordonatele punctului pe plan",
        addressDisciplina: "/matem",
        address: "/coordonatele-punctului-pe-plan",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "34",
            subtitleID: "16",
            titleID: "4",
            name: "Cauzele și izbucnirea războiului",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/coordonatele-punctului-pe-plan",
            addressSubject: "/cauzele-si-izbucnirea-razboiului",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Coordonatele punctului pe plan",
                path: "/matem/coordonatele-punctului-pe-plan",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "34",
                subtitleID: "16",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "34",  
                   subtitleID: "16",
                   titleID: "4" 
              }]
            }],
          },
          {
            id: "35",
            subtitleID: "16",
            titleID: "4",
            name: "Invazia germană aspura URSS",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/coordonatele-punctului-pe-plan",
            addressSubject: "/invazia-germana-aspura-urss",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Coordonatele punctului pe plan",
                path: "/matem/coordonatele-punctului-pe-plan",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "35",
                subtitleID: "16",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "35",  
                   subtitleID: "16",
                   titleID: "4" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "16",
            titleID: "4",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "16",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "16",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "16",
            titleID: "4",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "16",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "16",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "16",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "16",
            titleID: "4",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "16",
                titleID: "4", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "16",
                titleID: "4",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "17",
        name: "Noţiune de funcţie. Graficul funcţiei.",
        addressDisciplina: "/matem",
        address: "/notiune-de-functie",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "36",
            subtitleID: "17",
            titleID: "4",
            name: "Regimul politic în România (1940-1944)",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/notiune-de-functie",
            addressSubject: "/regimul-politic-in-romania",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Noţiune de funcţie. Graficul funcţiei.",
                path: "/matem/notiune-de-functie",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "36",
                subtitleID: "17",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "36",  
                   subtitleID: "17",
                   titleID: "4" 
              }]
            }],
          },
          {
            id: "37",
            subtitleID: "17",
            titleID: "4",
            name: "Angajarea României în război",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/notiune-de-functie",
            addressSubject: "/angajarea-româniei-in-razboi",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Noţiune de funcţie. Graficul funcţiei.",
                path: "/matem/notiune-de-functie",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "37",
                subtitleID: "17",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "37",  
                   subtitleID: "17",
                   titleID: "4" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "17",
            titleID: "4",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "17",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "17",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "17",
            titleID: "4",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "17",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "17",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "17",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "17",
            titleID: "4",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "17",
                titleID: "4", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "17",
                titleID: "4",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "18",
        name: "Funcţia de gradul I. Reprezentarea grafică. Proprietăţi.",
        addressDisciplina: "/matem",
        address: "/functia-de-gradul-1",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "38",
            subtitleID: "18",
            titleID: "4",
            name: "Reinstaurarea regimului totalitar comunist",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/functia-de-gradul-1",
            addressSubject: "/reinstaurarea-regimului-totalitar-comunist",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Funcţia de gradul I. Reprezentarea grafică. Proprietăţi.",
                path: "/matem/functia-de-gradul-1",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "38",
                subtitleID: "18",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "38",  
                   subtitleID: "18",
                   titleID: "4" 
              }]
            }],
          },
          {
            id: "39",
            subtitleID: "18",
            titleID: "4",
            name: "Politica față de evrei și romi",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/functia-de-gradul-1",
            addressSubject: "/politica-fata-de-evrei-si-romi",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Funcţia de gradul I. Reprezentarea grafică. Proprietăţi.",
                path: "/matem/functia-de-gradul-1",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "39",
                subtitleID: "18",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "39",  
                   subtitleID: "18",
                   titleID: "4" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "18",
            titleID: "4",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "18",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "18",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "18",
            titleID: "4",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "18",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "18",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "18",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "18",
            titleID: "4",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "18",
                titleID: "4", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "18",
                titleID: "4",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "19",
        name: "Funcţiile: proporţionalitate directă, proporţionalitate inversă, radical.",
        addressDisciplina: "/matem",
        address: "/proporţionalitate-directa-inversa-radical",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "40",
            subtitleID: "19",
            titleID: "4",
            name: "Reconstrucția postbelică și noile ordini mondiale",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/proporţionalitate-directa-inversa-radical",
            addressSubject: "/reconstructia-postbelica",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Funcţiile: proporţionalitate directă, proporţionalitate inversă, radical.",
                path: "/matem/proporţionalitate-directa-inversa-radical",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "40",
                subtitleID: "19",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "40",  
                   subtitleID: "19",
                   titleID: "4" 
              }]
            }],
          },
          {
            id: "41",
            subtitleID: "19",
            titleID: "4",
            name: "Impactul asupra societății și schimbările geopolitice",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/proporţionalitate-directa-inversa-radical",
            addressSubject: "/impactul-asupra-societatii",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Funcţiile: proporţionalitate directă, proporţionalitate inversă, radical.",
                path: "/matem/proporţionalitate-directa-inversa-radical",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "41",
                subtitleID: "19",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "41",  
                   subtitleID: "19",
                   titleID: "4" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "19",
            titleID: "4",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "19",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "19",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "19",
            titleID: "4",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "19",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "19",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "19",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "19",
            titleID: "4",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "19",
                titleID: "4", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "19",
                titleID: "4",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "20",
        name: "Funcţia de gradul II. Reprezentarea grafică. Proprietăţi.",
        addressDisciplina: "/matem",
        address: "/functia-de-gradul-2",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "42",
            subtitleID: "20",
            titleID: "4",
            name: "Organizația Națiunilor Unite",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/functia-de-gradul-2",
            addressSubject: "/organizatia-natiunilor-unite",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Funcţia de gradul II. Reprezentarea grafică. Proprietăţi.",
                path: "/matem/functia-de-gradul-2",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "42",
                subtitleID: "20",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "42",  
                   subtitleID: "20",
                   titleID: "4" 
              }]
            }],
          },
          {
            id: "43",
            subtitleID: "20",
            titleID: "4",
            name: "Începutul Războiului Rece",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/functia-de-gradul-2",
            addressSubject: "/inceputul-razboiului-rece",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Funcţia de gradul II. Reprezentarea grafică. Proprietăţi.",
                path: "/matem/functia-de-gradul-2",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "43",
                subtitleID: "20",
                titleID: "4"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "43",  
                   subtitleID: "20",
                   titleID: "4" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "20",
            titleID: "4",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "20",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "20",
                titleID: "4",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "20",
            titleID: "4",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "20",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "20",
                titleID: "4",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "20",
                    titleID: "4",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "20",
            titleID: "4",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "20",
                titleID: "4", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "20",
                titleID: "4",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
    ],
  },
  {
    id: "5",
    title: "Ecuaţii, inecuaţii, sisteme de ecuaţii, sisteme de inecuaţii.",
    disciplina: "Matematica",
    ciclul: "Ciclul gimnazial",
    subtitles: [
      {
        id: "21",
        name: "Ecuaţii de gradul I cu o necunoscută.",
        addressDisciplina: "/matem",
        address: "/ecuatii-de-gradul-1-cu-1-necunoscuta",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "42",
            subtitleID: "21",
            titleID: "5",
            name: "Organizația Națiunilor Unite",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/ecuatii-de-gradul-1-cu-1-necunoscuta",
            addressSubject: "/organizatia-natiunilor-unite",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Ecuaţii de gradul I cu o necunoscută.",
                path: "/matem/ecuatii-de-gradul-1-cu-1-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "42",
                subtitleID: "21",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "42",  
                   subtitleID: "21",
                   titleID: "5" 
              }]
            }],
          },
          {
            id: "43",
            subtitleID: "21",
            titleID: "5",
            name: "Începutul Războiului Rece",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/ecuatii-de-gradul-1-cu-1-necunoscuta",
            addressSubject: "/inceputul-razboiului-rece",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Ecuaţii de gradul I cu o necunoscută.",
                path: "/matem/ecuatii-de-gradul-1-cu-1-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "43",
                subtitleID: "21",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "43",  
                   subtitleID: "21",
                   titleID: "5" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "21",
            titleID: "5",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "21",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "21",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "21",
            titleID: "5",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "21",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "21",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "21",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "21",
            titleID: "5",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "21",
                titleID: "5", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "21",
                titleID: "5",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "22",
        name: "Inecuaţii de gradul I cu o necunoscută",
        addressDisciplina: "/matem",
        address: "/inecuatii-de-gradul-1-cu-1-necunoscuta",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "44",
            subtitleID: "22",
            titleID: "5",
            name: "Viața politică în URSS",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/Inecuatii-de-gradul-1-cu-1-necunoscuta",
            addressSubject: "/viata-politica-in-urss",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Inecuaţii de gradul I cu o necunoscută",
                path: "/matem/Inecuatii-de-gradul-1-cu-1-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "44",
                subtitleID: "22",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "44",  
                   subtitleID: "22",
                   titleID: "5" 
              }]
            }],
          },
          {
            id: "45",
            subtitleID: "22",
            titleID: "5",
            name: "Economia sovietică",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/Inecuatii-de-gradul-1-cu-1-necunoscuta",
            addressSubject: "/economia-sovietica",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Inecuaţii de gradul I cu o necunoscută",
                path: "/matem/Inecuatii-de-gradul-1-cu-1-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "45",
                subtitleID: "22",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "45",  
                   subtitleID: "22",
                   titleID: "5" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "22",
            titleID: "5",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "22",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "22",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "22",
            titleID: "5",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "22",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "22",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "22",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "22",
            titleID: "5",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "22",
                titleID: "5", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "22",
                titleID: "5",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "23",
        name: "Ecuaţii de gradul I cu două necunoscute.",
        addressDisciplina: "/matem",
        address: "/ecuatii-de-gradul-1-cu-2-necunoscute",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "48",
            subtitleID: "23",
            titleID: "5",
            name: "Foametea din anii 1946-1947",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/ecuatii-de-gradul-1-cu-2-necunoscute",
            addressSubject: "/foametea-din-anii-1946-1947",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Ecuaţii de gradul I cu două necunoscute.",
                path: "/matem/ecuatii-de-gradul-1-cu-2-necunoscute",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "48",
                subtitleID: "23",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "48",  
                   subtitleID: "23",
                   titleID: "5" 
              }]
            }],
          },
          {
            id: "49",
            subtitleID: "23",
            titleID: "5",
            name: "Colectivizarea forțată",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/ecuatii-de-gradul-1-cu-2-necunoscute",
            addressSubject: "/colectivizarea-fortata",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Ecuaţii de gradul I cu două necunoscute.",
                path: "/matem/ecuatii-de-gradul-1-cu-2-necunoscute",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "49",
                subtitleID: "23",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "49",  
                   subtitleID: "23",
                   titleID: "5" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "23",
            titleID: "5",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "23",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "23",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "23",
            titleID: "5",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "23",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "23",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "23",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "23",
            titleID: "5",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "23",
                titleID: "5", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "23",
                titleID: "5",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "24",
        name: "Sisteme de două ecuaţii de gradul I cu două necunoscute.",
        addressDisciplina: "/matem",
        address: "/sisteme-de-ecuatii-de-gradul-1-cu-2-necunoscute",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "12",
            subtitleID: "24",
            titleID: "5",
            name: "SUA după Primul Război Mondial",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/sisteme-de-2-ecuatii-de-gradul-1-cu-2-necunoscute",
            addressSubject: "/sua-dupa-primul-razboi-mondial",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Sisteme de două ecuaţii de gradul I cu două necunoscute.",
                path: "/matem/sisteme-de-2-ecuatii-de-gradul-1-cu-2-necunoscute",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "12",
                subtitleID: "24",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "12",  
                   subtitleID: "24",
                   titleID: "5" 
              }]
            }],
          },
          {
            id: "13",
            subtitleID: "24",
            titleID: "5",
            name: "Marea criză economică și consecințele ei",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/sisteme-de-2-ecuatii-de-gradul-1-cu-2-necunoscute",
            addressSubject: "/marea-criza-economica",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Sisteme de două ecuaţii de gradul I cu două necunoscute.",
                path: "/matem/sisteme-de-2-ecuatii-de-gradul-1-cu-2-necunoscute",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "13",
                subtitleID: "24",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "13",  
                   subtitleID: "24",
                   titleID: "5" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "24",
            titleID: "5",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "24",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "24",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "24",
            titleID: "5",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "24",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "24",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "24",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "24",
            titleID: "5",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "24",
                titleID: "5", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "24",
                titleID: "5",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "25",
        name: "Sisteme de inecuaţii de gradul I cu o necunoscută.",
        addressDisciplina: "/matem",
        address: "/sisteme-de-inecuatii-de-gradul-1-cu-o-necunoscuta",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "14",
            subtitleID: "25",
            titleID: "5",
            name: "Viața politică în Marea Britanie în anii 20-30 ai secolului XX-lea",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/sisteme-de-inecuatii-de-gradul-1-cu-o-necunoscuta",
            addressSubject: "/viata-politica-in-marea-britanie",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Sisteme de inecuaţii de gradul I cu o necunoscută.",
                path: "/matem/sisteme-de-inecuatii-de-gradul-1-cu-o-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "14",
                subtitleID: "25",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "14",  
                   subtitleID: "25",
                   titleID: "5" 
              }]
            }],
          },
          {
            id: "15",
            subtitleID: "25",
            titleID: "5",
            name: "Rivalitatea pentru putere dintre partidele politice în Franța",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/sisteme-de-inecuatii-de-gradul-1-cu-o-necunoscuta",
            addressSubject: "/viata-politica-in-franta",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Sisteme de inecuaţii de gradul I cu o necunoscută.",
                path: "/matem/sisteme-de-inecuatii-de-gradul-1-cu-o-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "15",
                subtitleID: "25",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "15",  
                   subtitleID: "25",
                   titleID: "5" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "25",
            titleID: "5",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "25",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "25",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "25",
            titleID: "5",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "25",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "25",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "25",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "25",
            titleID: "5",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "25",
                titleID: "5", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "25",
                titleID: "5",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "26",
        name: "Ecuaţii de gradul II cu o necunoscută. Relaţiile Viète.",
        addressDisciplina: "/matem",
        address: "/ecuatii-de-gradul-2-cu-o-necunoscuta",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "16",
            subtitleID: "26",
            titleID: "5",
            name: "Dezvoltarea economiei României în anii 1918-1940",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/ecuatii-de-gradul-2-cu-o-necunoscuta",
            addressSubject: "/dezvoltarea-economiei-româniei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Ecuaţii de gradul II cu o necunoscută. Relaţiile Viète.",
                path: "/matem/ecuatii-de-gradul-2-cu-o-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "16",
                subtitleID: "26",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "16",  
                   subtitleID: "26",
                   titleID: "5" 
              }]
            }],
          },
          {
            id: "17",
            subtitleID: "26",
            titleID: "5",
            name: "Minoritățile etnice în România",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/ecuatii-de-gradul-2-cu-o-necunoscuta",
            addressSubject: "/minoritatile-etnice-in-romania",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Ecuaţii de gradul II cu o necunoscută. Relaţiile Viète.",
                path: "/matem/ecuatii-de-gradul-2-cu-o-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "17",
                subtitleID: "26",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "17",  
                   subtitleID: "26",
                   titleID: "5" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "26",
            titleID: "5",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "26",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "26",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "26",
            titleID: "5",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "26",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "26",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "26",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "26",
            titleID: "5",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "26",
                titleID: "5", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "26",
                titleID: "5",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "27",
        name: "Ecuaţii raţionale cu o necunoscută.",
        addressDisciplina: "/matem",
        address: "/ecuatii-rationale-cu-1-necunoscuta",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "18",
            subtitleID: "27",
            titleID: "5",
            name: "Specificul dezvoltării social-economice a Basarabiei",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/ecuatii-rationale-cu-1-necunoscuta",
            addressSubject: "/dezvoltarea-social-economica-a-basarabiei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Ecuaţii raţionale cu o necunoscută.",
                path: "/matem/ecuatii-rationale-cu-1-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "18",
                subtitleID: "27",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "18",  
                   subtitleID: "27",
                   titleID: "5" 
              }]
            }],
          },
          {
            id: "19",
            subtitleID: "27",
            titleID: "5",
            name: "Minoritățile etnice în Basarabia",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/ecuatii-rationale-cu-1-necunoscuta",
            addressSubject: "/minoritatile-etnice-in-basarabia",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Ecuaţii raţionale cu o necunoscută.",
                path: "/matem/ecuatii-rationale-cu-1-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "19",
                subtitleID: "27",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "19",  
                   subtitleID: "27",
                   titleID: "5" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "27",
            titleID: "5",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "27",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "27",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "27",
            titleID: "5",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "27",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "27",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "27",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "27",
            titleID: "5",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "27",
                titleID: "5", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "27",
                titleID: "5",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "28",
        name: "Inecuaţii de gradul II cu o necunoscută.",
        addressDisciplina: "/matem",
        address: "/inecuatii-de-gradul-2-cu-1-necunoscuta",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "20",
            subtitleID: "28",
            titleID: "5",
            name: "Formarea RASSM",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/inecuatii-de-gradul-2-cu-1-necunoscuta",
            addressSubject: "/formarea-rassm",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Inecuaţii de gradul II cu o necunoscută.",
                path: "/matem/inecuatii-de-gradul-2-cu-1-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "20",
                subtitleID: "28",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "20",  
                   subtitleID: "28",
                   titleID: "5" 
              }]
            }],
          },
          {
            id: "21",
            subtitleID: "28",
            titleID: "5",
            name: "Represiunile staliniste",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/inecuatii-de-gradul-2-cu-1-necunoscuta",
            addressSubject: "/represiunile-staliniste",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Inecuaţii de gradul II cu o necunoscută.",
                path: "/matem/inecuatii-de-gradul-2-cu-1-necunoscuta",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "21",
                subtitleID: "28",
                titleID: "5"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "21",  
                   subtitleID: "28",
                   titleID: "5" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "28",
            titleID: "5",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "28",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "28",
                titleID: "5",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "28",
            titleID: "5",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "28",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "28",
                titleID: "5",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "28",
                    titleID: "5",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "28",
            titleID: "5",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "28",
                titleID: "5", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "28",
                titleID: "5",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
    ],

  },
  {
    id: "6",
    title: "Geometrie.",
    disciplina: "Matematica",
    ciclul: "Ciclul gimnazial",
    subtitles: [
      {
        id: "29",
        name: "Unități de măsură (lungime, timp, arie, volum).",
        addressDisciplina: "/matem",
        address: "/initati-de-masura",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "50",
            subtitleID: "29",
            titleID: "6",
            name: "Transformări politice și economice în RSSM între 1985-1991",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/initati-de-masura",
            addressSubject: "/transformari-politice-si-economice",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Unități de măsură",
                path: "/matem/initati-de-masura",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "50",
                subtitleID: "29",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "50",  
                   subtitleID: "29",
                   titleID: "6" 
              }]
            }],
          },
          {
            id: "51",
            subtitleID: "29",
            titleID: "6",
            name: "Proclamarea independenței Republicii Moldova",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/initati-de-masura",
            addressSubject: "/proclamarea-independentei-rm",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Unități de măsură",
                path: "/matem/initati-de-masura",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "51",
                subtitleID: "29",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "51",  
                   subtitleID: "29",
                   titleID: "6" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "29",
            titleID: "6",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "29",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "29",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "29",
            titleID: "6",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "29",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "29",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "29",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "29",
            titleID: "6",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "29",
                titleID: "6", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "29",
                titleID: "6",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "30",
        name: "Noțiuni geometrice fundamentale.",
        addressDisciplina: "/matem",
        address: "/notiuni-geometrice-fundamentale.",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "52",
            subtitleID: "30",
            titleID: "6",
            name: "Originile conflictului",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/notiuni-geometrice-fundamentale.",
            addressSubject: "/originile-conflictului",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Noțiuni geometrice fundamentale.",
                path: "/matem/notiuni-geometrice-fundamentale.",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "52",
                subtitleID: "30",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "52",  
                   subtitleID: "30",
                   titleID: "6" 
              }]
            }],
          },
          {
            id: "53",
            subtitleID: "30",
            titleID: "6",
            name: "Formarea autoproclamatei RSSMN",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/notiuni-geometrice-fundamentale.",
            addressSubject: "/formarea-autoproclamatei-rssmn",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Noțiuni geometrice fundamentale.",
                path: "/matem/notiuni-geometrice-fundamentale.",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "53",
                subtitleID: "30",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "53",  
                   subtitleID: "30",
                   titleID: "6" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "30",
            titleID: "6",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "30",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "30",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "30",
            titleID: "6",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "30",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "30",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "30",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "30",
            titleID: "6",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "30",
                titleID: "6", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "30",
                titleID: "6",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
        ]
      },
      {
        id: "31",
        name: "Triunghiuri.",
        addressDisciplina: "/matem",
        address: "/triunghiuri",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "12",
            subtitleID: "31",
            titleID: "6",
            name: "SUA după Primul Război Mondial",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/triunghiuri",
            addressSubject: "/sua-dupa-primul-razboi-mondial",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Triunghiuri.",
                path: "/matem/triunghiuri",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "12",
                subtitleID: "31",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "12",  
                   subtitleID: "31",
                   titleID: "6" 
              }]
            }],
          },
          {
            id: "13",
            subtitleID: "31",
            titleID: "6",
            name: "Marea criză economică și consecințele ei",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/triunghiuri",
            addressSubject: "/marea-criza-economica",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Triunghiuri.",
                path: "/matem/triunghiuri",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "13",
                subtitleID: "31",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "13",  
                   subtitleID: "31",
                   titleID: "6" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "31",
            titleID: "6",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "31",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "31",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "31",
            titleID: "6",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "31",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "31",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "31",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "31",
            titleID: "6",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "31",
                titleID: "6", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "31",
                titleID: "6",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "32",
        name: "Patrulatere. Poligoane.",
        addressDisciplina: "/matem",
        address: "/patrulatere-poligoane",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "14",
            subtitleID: "32",
            titleID: "6",
            name: "Viața politică în Marea Britanie în anii 20-30 ai secolului XX-lea",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/patrulatere-poligoane",
            addressSubject: "/viata-politica-in-marea-britanie",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Patrulatere. Poligoane.",
                path: "/matem/patrulatere-poligoane",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "14",
                subtitleID: "32",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "14",  
                   subtitleID: "32",
                   titleID: "6" 
              }]
            }],
          },
          {
            id: "15",
            subtitleID: "32",
            titleID: "6",
            name: "Rivalitatea pentru putere dintre partidele politice în Franța",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/patrulatere-poligoane",
            addressSubject: "/viata-politica-in-franta",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Patrulatere. Poligoane.",
                path: "/matem/patrulatere-poligoane",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "15",
                subtitleID: "32",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "15",  
                   subtitleID: "32",
                   titleID: "6" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "32",
            titleID: "6",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "32",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "32",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "32",
            titleID: "6",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "32",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "32",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "32",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "32",
            titleID: "6",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "32",
                titleID: "6", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "32",
                titleID: "6",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "33",
        name: "Cercul. Discul.",
        addressDisciplina: "/matem",
        address: "/cercul-discul",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "16",
            subtitleID: "33",
            titleID: "6",
            name: "Dezvoltarea economiei României în anii 1918-1940",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/cercul-discul",
            addressSubject: "/dezvoltarea-economiei-româniei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Cercul. Discul.",
                path: "/matem/cercul-discul",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "16",
                subtitleID: "33",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "16",  
                   subtitleID: "33",
                   titleID: "6" 
              }]
            }],
          },
          {
            id: "17",
            subtitleID: "33",
            titleID: "6",
            name: "Minoritățile etnice în România",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/cercul-discul",
            addressSubject: "/minoritatile-etnice-in-romania",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Cercul. Discul.",
                path: "/matem/cercul-discul",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "17",
                subtitleID: "33",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "17",  
                   subtitleID: "33",
                   titleID: "6" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "33",
            titleID: "6",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "33",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "33",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "33",
            titleID: "6",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "33",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "33",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "33",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "33",
            titleID: "6",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "33",
                titleID: "6", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "33",
                titleID: "6",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "34",
        name: "Arii.",
        addressDisciplina: "/matem",
        address: "/arii",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "18",
            subtitleID: "34",
            titleID: "6",
            name: "Specificul dezvoltării social-economice a Basarabiei",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/arii",
            addressSubject: "/dezvoltarea-social-economica-a-basarabiei",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Arii.",
                path: "/matem/arii",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "18",
                subtitleID: "34",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "18",  
                   subtitleID: "34",
                   titleID: "6" 
              }]
            }],
          },
          {
            id: "19",
            subtitleID: "34",
            titleID: "6",
            name: "Minoritățile etnice în Basarabia",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/arii",
            addressSubject: "/minoritatile-etnice-in-basarabia",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Arii.",
                path: "/matem/arii",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "19",
                subtitleID: "34",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "19",  
                   subtitleID: "34",
                   titleID: "6" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "34",
            titleID: "6",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "34",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "34",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "34",
            titleID: "6",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "34",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "34",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "34",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "34",
            titleID: "6",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "34",
                titleID: "6", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "34",
                titleID: "6",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "35",
        name: "Poliedre.",
        addressDisciplina: "/matem",
        address: "/poliedre",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "20",
            subtitleID: "35",
            titleID: "6",
            name: "Formarea RASSM",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/poliedre",
            addressSubject: "/formarea-rassm",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Poliedre.",
                path: "/matem/poliedre",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "20",
                subtitleID: "35",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "20",  
                   subtitleID: "35",
                   titleID: "6" 
              }]
            }],
          },
          {
            id: "21",
            subtitleID: "35",
            titleID: "6",
            name: "Represiunile staliniste",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/poliedre",
            addressSubject: "/represiunile-staliniste",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Poliedre.",
                path: "/matem/poliedre",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "21",
                subtitleID: "35",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "21",  
                   subtitleID: "35",
                   titleID: "6" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "35",
            titleID: "6",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "35",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "35",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "35",
            titleID: "6",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "35",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "35",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "35",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "35",
            titleID: "6",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "35",
                titleID: "6", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "35",
                titleID: "6",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
      {
        id: "36",
        name: "Corpuri de rotație.",
        addressDisciplina: "/matem",
        address: "/Corpuri-de-rotatie",
        breadcrumb: [
          { name: "Discipline", path: "/" },
          { name: "Matematica", path: "/matem" },
        ],
        subjects: [
          {
            id: "22",
            subtitleID: "36",
            titleID: "6",
            name: "Manifestările suprarealismului",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/cultura-si-stiinta-in-perioada-interbelica",
            addressSubject: "/manifestările-suprarealismului",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Corpuri de rotație.",
                path: "/matem/Corpuri-de-rotatie",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "22",
                subtitleID: "36",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "22",  
                   subtitleID: "36",
                   titleID: "6" 
              }]
            }],
          },
          {
            id: "23",
            subtitleID: "36",
            titleID: "6",
            name: "Descoperiri științifice",
            path: "/subtema1",
            addressDisciplina: "/matem",
            addressSubtitle: "/cultura-si-stiinta-in-perioada-interbelica",
            addressSubject: "/descoperiri-stiintifice",
            breadcrumb: [
              { name: "Discipline", path: "/" },
              { name: "Matematica", path: "/matem" },
              {
                name: "Corpuri de rotație.",
                path: "/matem/Corpuri-de-rotatie",
              },
            ],
            vomAfla: [
              {
                id: "1",
                subjectID: "23",
                subtitleID: "36",
                titleID: "6"
               }
             ],
             teste: [{
              id: 1,
              quizArray: [{
                   id: 1,
                   testID: "1",
                   subjectID: "23",  
                   subtitleID: "36",
                   titleID: "6" 
              }]
            }],
          },
        ],
        aplicatii: [
          {
            id: "1",
            subtitleID: "36",
            titleID: "6",
            name: "Subiectul I",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect1",
            quizArray: [
              {
                id: "1",
                subiect: "1",
                subtitleID: "36",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              },
              {
                id: "2",
                subiect: "1",
                subtitleID: "36",
                titleID: "6",
                barem: {
                  maxPoints: 3,
                }
              }
            ]
          },
          {
            id: "2",
            name: "Subiectul II",
            subtitleID: "36",
            titleID: "6",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect2",
            quizArray: [
              {
                id: "1",
                subiect: "2",
                subtitleID: "36",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "1",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
               },
               {
                id: "2",
                subiect: "2",
                subtitleID: "36",
                titleID: "6",
                item: [
                  {
                    id: 1,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 2,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 3,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 2,
                    }
                  },
                  {
                    id: 4,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 3,
                    }
                  },
                  {
                    id: 5,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 4,
                    }
                  },
                  {
                    id: 6,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  },
                  {
                    id: 7,
                    superitem: "2",
                    subiect: "2",
                    subtitleID: "36",
                    titleID: "6",
                    barem: {
                      maxPoints: 5,
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            subtitleID: "36",
            titleID: "6",
            name: "Subiectul III",
            complexity: "dificil",
            complexityNumber: 3,
            addressSubject: "/examen-subiect3",
            quizArray: [
              {
                id: "1",
                subiect: "3",
                subtitleID: "36",
                titleID: "6", 
                barem: {
                  maxPoints: 15,
                }   
              },
              {
                id: "2",
                subiect: "3",
                subtitleID: "36",
                titleID: "6",
                barem: {
                  maxPoints: 15,
                } 
              }
            ]
          }
         ]
      },
    ],
  },
];
export default temeMatem;
