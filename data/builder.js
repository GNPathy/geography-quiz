const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. DATASETS
const usStates = [
{s:"Alabama",c:"Montgomery",n:"Heart of Dixie", b:"Florida"},
{s:"Alaska",c:"Juneau",n:"The Last Frontier", b:"None"},
{s:"Arizona",c:"Phoenix",n:"Grand Canyon State", b:"Utah"},
{s:"Arkansas",c:"Little Rock",n:"Natural State", b:"Texas"},
{s:"California",c:"Sacramento",n:"Golden State", b:"Nevada"},
{s:"Colorado",c:"Denver",n:"Centennial State", b:"Wyoming"},
{s:"Connecticut",c:"Hartford",n:"Constitution State", b:"New York"},
{s:"Delaware",c:"Dover",n:"First State", b:"Maryland"},
{s:"Florida",c:"Tallahassee",n:"Sunshine State", b:"Georgia"},
{s:"Georgia",c:"Atlanta",n:"Peach State", b:"South Carolina"},
{s:"Hawaii",c:"Honolulu",n:"Aloha State", b:"None"},
{s:"Idaho",c:"Boise",n:"Gem State", b:"Montana"},
{s:"Illinois",c:"Springfield",n:"Prairie State", b:"Indiana"},
{s:"Indiana",c:"Indianapolis",n:"Hoosier State", b:"Ohio"},
{s:"Iowa",c:"Des Moines",n:"Hawkeye State", b:"Minnesota"},
{s:"Kansas",c:"Topeka",n:"Sunflower State", b:"Missouri"},
{s:"Kentucky",c:"Frankfort",n:"Bluegrass State", b:"Tennessee"},
{s:"Louisiana",c:"Baton Rouge",n:"Pelican State", b:"Texas"},
{s:"Maine",c:"Augusta",n:"Pine Tree State", b:"New Hampshire"},
{s:"Maryland",c:"Annapolis",n:"Old Line State", b:"Virginia"},
{s:"Massachusetts",c:"Boston",n:"Bay State", b:"Connecticut"},
{s:"Michigan",c:"Lansing",n:"Wolverine State", b:"Indiana"},
{s:"Minnesota",c:"St. Paul",n:"North Star State", b:"Wisconsin"},
{s:"Mississippi",c:"Jackson",n:"Magnolia State", b:"Alabama"},
{s:"Missouri",c:"Jefferson City",n:"Show-Me State", b:"Kansas"},
{s:"Montana",c:"Helena",n:"Treasure State", b:"Idaho"},
{s:"Nebraska",c:"Lincoln",n:"Cornhusker State", b:"South Dakota"},
{s:"Nevada",c:"Carson City",n:"Silver State", b:"California"},
{s:"New Hampshire",c:"Concord",n:"Granite State", b:"Vermont"},
{s:"New Jersey",c:"Trenton",n:"Garden State", b:"Pennsylvania"},
{s:"New Mexico",c:"Santa Fe",n:"Land of Enchantment", b:"Arizona"},
{s:"New York",c:"Albany",n:"Empire State", b:"Pennsylvania"},
{s:"North Carolina",c:"Raleigh",n:"Tar Heel State", b:"Virginia"},
{s:"North Dakota",c:"Bismarck",n:"Peace Garden State", b:"South Dakota"},
{s:"Ohio",c:"Columbus",n:"Buckeye State", b:"Michigan"},
{s:"Oklahoma",c:"Oklahoma City",n:"Sooner State", b:"Texas"},
{s:"Oregon",c:"Salem",n:"Beaver State", b:"Washington"},
{s:"Pennsylvania",c:"Harrisburg",n:"Keystone State", b:"Ohio"},
{s:"Rhode Island",c:"Providence",n:"Ocean State", b:"Connecticut"},
{s:"South Carolina",c:"Columbia",n:"Palmetto State", b:"North Carolina"},
{s:"South Dakota",c:"Pierre",n:"Mount Rushmore State", b:"North Dakota"},
{s:"Tennessee",c:"Nashville",n:"Volunteer State", b:"Kentucky"},
{s:"Texas",c:"Austin",n:"Lone Star State", b:"Oklahoma"},
{s:"Utah",c:"Salt Lake City",n:"Beehive State", b:"Colorado"},
{s:"Vermont",c:"Montpelier",n:"Green Mountain State", b:"New Hampshire"},
{s:"Virginia",c:"Richmond",n:"Old Dominion", b:"Maryland"},
{s:"Washington",c:"Olympia",n:"Evergreen State", b:"Oregon"},
{s:"West Virginia",c:"Charleston",n:"Mountain State", b:"Virginia"},
{s:"Wisconsin",c:"Madison",n:"Badger State", b:"Minnesota"},
{s:"Wyoming",c:"Cheyenne",n:"Equality State", b:"Montana"}
];

const inStates = [
{s:"Andhra Pradesh",c:"Amaravati",l:"Telugu", b:"Telangana"},
{s:"Arunachal Pradesh",c:"Itanagar",l:"English", b:"Assam"},
{s:"Assam",c:"Dispur",l:"Assamese", b:"Meghalaya"},
{s:"Bihar",c:"Patna",l:"Hindi", b:"Uttar Pradesh"},
{s:"Chhattisgarh",c:"Raipur",l:"Hindi", b:"Odisha"},
{s:"Goa",c:"Panaji",l:"Konkani", b:"Maharashtra"},
{s:"Gujarat",c:"Gandhinagar",l:"Gujarati", b:"Rajasthan"},
{s:"Haryana",c:"Chandigarh",l:"Hindi", b:"Punjab"},
{s:"Himachal Pradesh",c:"Shimla",l:"Hindi", b:"Uttarakhand"},
{s:"Jharkhand",c:"Ranchi",l:"Hindi", b:"Bihar"},
{s:"Karnataka",c:"Bengaluru",l:"Kannada", b:"Maharashtra"},
{s:"Kerala",c:"Thiruvananthapuram",l:"Malayalam", b:"Tamil Nadu"},
{s:"Madhya Pradesh",c:"Bhopal",l:"Hindi", b:"Uttar Pradesh"},
{s:"Maharashtra",c:"Mumbai",l:"Marathi", b:"Gujarat"},
{s:"Manipur",c:"Imphal",l:"Meitei", b:"Nagaland"},
{s:"Meghalaya",c:"Shillong",l:"English", b:"Assam"},
{s:"Mizoram",c:"Aizawl",l:"Mizo", b:"Tripura"},
{s:"Nagaland",c:"Kohima",l:"English", b:"Manipur"},
{s:"Odisha",c:"Bhubaneswar",l:"Odia", b:"West Bengal"},
{s:"Punjab",c:"Chandigarh",l:"Punjabi", b:"Haryana"},
{s:"Rajasthan",c:"Jaipur",l:"Hindi", b:"Gujarat"},
{s:"Sikkim",c:"Gangtok",l:"Nepali", b:"West Bengal"},
{s:"Tamil Nadu",c:"Chennai",l:"Tamil", b:"Kerala"},
{s:"Telangana",c:"Hyderabad",l:"Telugu", b:"Andhra Pradesh"},
{s:"Tripura",c:"Agartala",l:"Bengali", b:"Assam"},
{s:"Uttar Pradesh",c:"Lucknow",l:"Hindi", b:"Bihar"},
{s:"Uttarakhand",c:"Dehradun",l:"Hindi", b:"Uttar Pradesh"},
{s:"West Bengal",c:"Kolkata",l:"Bengali", b:"Odisha"}
];

const usRivers = [
  {q:"Which state is the mouth of the Mississippi River?", a:"Louisiana"},
  {q:"Which state is famous for the Colorado River passing through the Grand Canyon?", a:"Arizona"},
  {q:"The Hudson River flows primarily through which state?", a:"New York"},
  {q:"The Missouri River flows into the Mississippi in which state?", a:"Missouri"},
  {q:"The Rio Grande forms the southern border of which US state?", a:"Texas"},
  {q:"The Ohio River forms the northern border of which state before joining the Mississippi?", a:"Kentucky"},
  {q:"The Snake River runs through Hell's Canyon in which US state?", a:"Idaho"},
  {q:"Which state is heavily defined by the Yukon River?", a:"Alaska"},
  {q:"The Columbia River forms the border between Washington and which state?", a:"Oregon"},
  {q:"The Potomac River separates Washington D.C. from which state?", a:"Virginia"},
  {q:"The Delaware River famously borders Pennsylvania and which state?", a:"New Jersey"},
  {q:"The Arkansas River flows through which state capital?", a:"Arkansas"},
  {q:"The Tennessee River curves heavily through which state beside its namesake?", a:"Alabama"},
  {q:"The Platte River is a major waterway in which Great Plains state?", a:"Nebraska"},
  {q:"Which state is bordered by the Connecticut River to the east?", a:"Vermont"}
];

const usMountains = [
  {q:"The Rocky Mountains' highest peak, Mount Elbert, is in which state?", a:"Colorado"},
  {q:"The Appalachian Mountains end their southern journey in which state?", a:"Georgia"},
  {q:"The Sierra Nevada mountains run primarily through which state?", a:"California"},
  {q:"Mount Denali, the highest peak in North America, is in which state?", a:"Alaska"},
  {q:"The Great Smoky Mountains lie on the border of North Carolina and which state?", a:"Tennessee"},
  {q:"The White Mountains, famous for Mount Washington, are in which state?", a:"New Hampshire"},
  {q:"The Green Mountains run heavily through which New England state?", a:"Vermont"},
  {q:"The Cascade Range features Mount Rainier in which state?", a:"Washington"},
  {q:"The Ozark Mountains primarily stretch across Arkansas and which state?", a:"Missouri"},
  {q:"The Adirondack Mountains are a massive dome in which state's upstate region?", a:"New York"},
  {q:"The Uinta Mountains, known for running east to west, are in which state?", a:"Utah"},
  {q:"The Teton Range is a breathtaking mountain range in which state?", a:"Wyoming"},
  {q:"The Bitterroot Range forms the border between Idaho and which state?", a:"Montana"},
  {q:"The Guadalupe Mountains feature the highest point of which state?", a:"Texas"},
  {q:"The Black Hills, home to Mount Rushmore, are a small mountain range in which state?", a:"South Dakota"}
];

const inRivers = [
  {q:"The Ganges River empties into the sea primarily through which Indian state?", a:"West Bengal"},
  {q:"The Godavari River, often called the South Ganges, has its massive delta in which state?", a:"Andhra Pradesh"},
  {q:"The Brahmaputra River enters India through which state?", a:"Arunachal Pradesh"},
  {q:"The Narmada River originates in and flows largely through which state?", a:"Madhya Pradesh"},
  {q:"The Yamuna River flows past the Taj Mahal, located in which state?", a:"Uttar Pradesh"},
  {q:"The Krishna River flows across the Deccan Plateau and ends in which state?", a:"Andhra Pradesh"},
  {q:"The Kaveri (Cauvery) River is highly disputed between Karnataka and which state?", a:"Tamil Nadu"},
  {q:"The Mahanadi River is famous for the Hirakud Dam located in which state?", a:"Odisha"},
  {q:"The Tapti River runs parallel to the Narmada and meets the sea in which state?", a:"Gujarat"},
  {q:"The Sabarmati River famously runs through the main city of which state?", a:"Gujarat"},
  {q:"The Beas River is one of the five major rivers of which state?", a:"Punjab"},
  {q:"The Hooghly River is a major distributary flowing through the capital of which state?", a:"West Bengal"},
  {q:"The Jhelum River flows through the beautiful valleys of which region?", a:"Jammu & Kashmir"},
  {q:"The Chambal River is famous for its badlands located heavily in which state?", a:"Madhya Pradesh"},
  {q:"The Tungabhadra River is a major tributary in which southern state?", a:"Karnataka"}
];

const inMountains = [
  {q:"The highest peak entirely within India, Nanda Devi, is in which state?", a:"Uttarakhand"},
  {q:"The Aravalli Range, one of the oldest in the world, runs heavily through which state?", a:"Rajasthan"},
  {q:"The Western Ghats originate near the border of Gujarat and which state?", a:"Maharashtra"},
  {q:"The Eastern Ghats run brokenly along the coastline, ending roughly in which state?", a:"Tamil Nadu"},
  {q:"The Nilgiri Hills serve as the junction for the Eastern and Western Ghats in which state?", a:"Tamil Nadu"},
  {q:"The Khasi and Garo Hills, incredibly rainy regions, are in which northeastern state?", a:"Meghalaya"},
  {q:"The Vindhya Range geographically separates north and south India primarily in which state?", a:"Madhya Pradesh"},
  {q:"The Satpura Range runs parallel to the Vindhyas, ending in which state?", a:"Chhattisgarh"},
  {q:"The Karakoram Range holds the mighty K2 on the border of which region?", a:"Ladakh"},
  {q:"The Zanskar Range limits the monsoon rains from teaching which region?", a:"Ladakh"},
  {q:"Anamudi, the highest peak in the Western Ghats, is located in which state?", a:"Kerala"},
  {q:"The Cardamom Hills, famous for spice plantations, are located in which coastal state?", a:"Kerala"},
  {q:"The Patkai Range forms the eastern border of India with Myanmar in which state?", a:"Arunachal Pradesh"},
  {q:"Mount Khangchendzonga, the third highest mountain in the world, borders Nepal and which state?", a:"Sikkim"},
  {q:"The Girnar Hills are a small but famous range in which western state?", a:"Gujarat"}
];

// Helper to grab random distractors from a list
function getDistractors(list, correct, count=3) {
  let opts = list.filter(item => item !== correct);
  // shuffle
  for(let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts.slice(0, count);
}

function processBasicList(dataset, qKey, aKey, formatStr) {
    const listAnswers = dataset.map(d => d[aKey]);
    return dataset.map(item => {
        let questionText = formatStr.replace("%%", item[qKey]);
        let correctAns = item[aKey];
        return {
            q: questionText,
            a: correctAns,
            c: [correctAns, ...getDistractors(listAnswers, correctAns, 3)],
            difficulty: "intermediate"
        }
    });
}

function processRawQA(qaList, allAnswersList) {
    return qaList.map(item => {
        return {
            q: item.q,
            a: item.a,
            c: [item.a, ...getDistractors(allAnswersList, item.a, 3)],
            difficulty: "intermediate"
        }
    });
}

// 2. BUILD SCRIPT
async function buildDatabase() {
  console.log("Fetching World Data...");
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,languages,population,independent');
    if (!res.ok) throw new Error("API responded with status: " + res.status);
    
    const countries = await res.json();
    if (!Array.isArray(countries)) throw new Error("API returned invalid data: " + JSON.stringify(countries));

    let db = {
      "World": { "Capitals": [], "Rivers": [], "Mountains": [], "Neighbors": [], "Languages": [] },
      "USA": { "Capitals": [], "Rivers": [], "Mountains": [], "Neighbors": [], "Facts": [] },
      "India": { "Capitals": [], "Rivers": [], "Mountains": [], "Neighbors": [], "Languages": [] }
    };

    // --- USA ---
    db["USA"]["Capitals"] = processBasicList(usStates, "s", "c", "What is the capital of %%?");
    db["USA"]["Facts"] = processBasicList(usStates, "n", "s", "Which state is known as 'The %%'?");
    db["USA"]["Neighbors"] = processBasicList(usStates.filter(s=>s.b !== "None"), "s", "b", "Which of the following states borders %%?");
    
    let usAllStates = usStates.map(s => s.s);
    db["USA"]["Rivers"] = processRawQA(usRivers, usAllStates);
    db["USA"]["Mountains"] = processRawQA(usMountains, usAllStates);

    // --- INDIA ---
    db["India"]["Capitals"] = processBasicList(inStates, "s", "c", "What is the capital of the state of %%?");
    db["India"]["Languages"] = processBasicList(inStates.filter(s=>s.l !== "English" && s.l !== "Hindi"), "l", "s", "Which state primary speaks %%?");
    db["India"]["Neighbors"] = processBasicList(inStates, "s", "b", "Which of the following states borders %%?");
    
    let inAllStates = inStates.map(s => s.s);
    db["India"]["Rivers"] = processRawQA(inRivers, inAllStates);
    db["India"]["Mountains"] = processRawQA(inMountains, inAllStates);

    // --- WORLD ---
    let validCountries = countries.filter(c => c.independent && c.capital && c.capital.length > 0 && c.population > 100000);
    let worldAllCountries = validCountries.map(c => c.name.common);
    let worldAllCapitals = validCountries.map(c => c.capital[0]);
    let worldAllLanguages = [];
    validCountries.forEach(c => {
       if(c.languages) Object.values(c.languages).forEach(l => { if(!worldAllLanguages.includes(l)) worldAllLanguages.push(l); }); 
    });

    // World Capitals
    validCountries.forEach(c => {
        let cap = c.capital[0];
        db["World"]["Capitals"].push({
            q: `What is the capital of ${c.name.common}?`,
            a: cap,
            c: [cap, ...getDistractors(worldAllCapitals, cap, 3)],
            difficulty: c.population > 20000000 ? "novice" : "intermediate"
        });
    });

    // World Languages
    validCountries.forEach(c => {
        if(c.languages) {
            let lang = Object.values(c.languages)[0];
            if(lang !== "English") {
                db["World"]["Languages"].push({
                    q: `Which language is primarily spoken in ${c.name.common}?`,
                    a: lang,
                    c: [lang, ...getDistractors(worldAllLanguages, lang, 3)],
                    difficulty: "expert"
                });
            }
        }
    });

    const worldRivers = [
        {q: "The Nile River ends in which country?", a: "Egypt"},
        {q: "The Amazon River flows massively through which country?", a: "Brazil"},
        {q: "The Yangtze River is the longest river in which country?", a: "China"},
        {q: "The Mississippi River runs straight through which country?", a: "United States"},
        {q: "The Yenisei River flows north into the Arctic Ocean from which country?", a: "Russia"},
        {q: "The Yellow River is considered the cradle of civilization for which country?", a: "China"},
        {q: "The Ob River is a major waterway in which massive nation?", a: "Russia"},
        {q: "The Parana River flows heavily through Brazil and which other nation?", a: "Argentina"},
        {q: "The Congo River is the deepest river in the world, located in which country?", a: "DR Congo"},
        {q: "The Amur River forms the border between Russia and which country?", a: "China"},
        {q: "The Lena River is the easternmost of the major Siberian rivers in which country?", a: "Russia"},
        {q: "The Mekong River creates the massive delta in which country?", a: "Vietnam"},
        {q: "The Mackenzie River is the longest river system in which country?", a: "Canada"},
        {q: "The Niger River creates a massive inland delta in which sub-Saharan country?", a: "Mali"},
        {q: "The Murray River is the longest river in which country?", a: "Australia"},
        {q: "The Tocantins River is completely contained within which South American country?", a: "Brazil"},
        {q: "The Volga River is the longest river in Europe, primarily in which country?", a: "Russia"},
        {q: "The Indus River is the lifeline of which South Asian country?", a: "Pakistan"},
        {q: "The Ganges River flows from the Himalayas through India and ends in which nation?", a: "Bangladesh"},
        {q: "The Danube River passes through four capital cities before ending in which country?", a: "Romania"}
    ];

    const worldMountains = [
        {q: "Mount Everest, the highest peak in the world, sits on the border of Nepal and which country?", a: "China"},
        {q: "K2, the second highest peak, is located on the border between China and which country?", a: "Pakistan"},
        {q: "Kangchenjunga is located on the border of Nepal and which country?", a: "India"},
        {q: "Mount Kilimanjaro, the highest peak in Africa, is in which country?", a: "Tanzania"},
        {q: "Mount Elbrus, the highest peak in Europe, is in which country?", a: "Russia"},
        {q: "Aconcagua, the highest mountain outside of Asia, is in which country?", a: "Argentina"},
        {q: "Mount McKinley (Denali), the highest peak in North America, is in which country?", a: "United States"},
        {q: "Mount Blanc is the highest peak in the Alps, shared by Italy and which country?", a: "France"},
        {q: "Mount Fuji is a highly symmetrical volcano in which country?", a: "Japan"},
        {q: "Mount Cook (Aoraki) is the highest mountain in which country?", a: "New Zealand"},
        {q: "The Matterhorn is a famous pyramidal peak in the Alps on the border of Italy and which country?", a: "Switzerland"},
        {q: "Mount Logan is the highest mountain in which country?", a: "Canada"},
        {q: "Mount Vinson is the highest peak in which remote region?", a: "Antarctica"},
        {q: "Mount Kosciuszko is the highest mainland mountain in which country?", a: "Australia"},
        {q: "Mount Ararat, said to be the resting place of Noah's Ark, is in which country?", a: "Turkey"},
        {q: "Pico de Orizaba, the highest volcano in North America, is in which country?", a: "Mexico"},
        {q: "Mount Toubkal, the highest peak in the Atlas Mountains, is in which country?", a: "Morocco"},
        {q: "Mount Kinabalu is a visually stunning mountain in which Southeast Asian country?", a: "Malaysia"},
        {q: "Table Mountain famously overlooks the capital city of which country?", a: "South Africa"},
        {q: "Mount Olympus, the mythological home of the gods, is in which country?", a: "Greece"}
    ];

    db["World"]["Rivers"] = processRawQA(worldRivers, worldAllCountries);
    db["World"]["Mountains"] = processRawQA(worldMountains, worldAllCountries);

    // Save new database
    fs.writeFileSync(path.join(__dirname, 'questions.json'), JSON.stringify(db, null, 2));
    console.log("data/questions.json successfully generated with full completeness!");
  } catch (err) {
    console.error('Error fetching world data: ', err);
  }
}

buildDatabase();
