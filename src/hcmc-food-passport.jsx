import { useState, useEffect } from "react";

// ── CUISINE COLORS ───────────────────────────────────────────────────────
const CUISINE_BG = {
  "Japanese 🇯🇵": "#e8f0f8",
  "Korean 🇰🇷": "#fff0e0",
  "Thai 🇹🇭": "#f5e8f8",
  "Chinese / HK 🇨🇳🇭🇰": "#fff5e8",
  "Italian 🇮🇹": "#fce8e8",
  "Spanish 🇪🇸": "#fff8e0",
  "Mexican 🇲🇽": "#f0fce8",
  "French 🇫🇷": "#f0e8fc",
  "American 🇺🇸": "#f5f5f5",
  "Indian 🇮🇳": "#fff5e0",
  "Malaysia / Singapore 🇲🇾🇸🇬": "#e8f5ee",
  "Indonesia 🇮🇩": "#f8f0e8",
  "Middle Eastern 🇱🇧🇹🇷": "#fdf8e8",
  "Vietnamese 🇻🇳": "#eaf8f0",
  "Cafe / Brunch ☕": "#f8f3e0",
};
const CUISINES = Object.keys(CUISINE_BG);

// ── ALL 138 RESTAURANTS ──────────────────────────────────────────────────
const INITIAL_DATA = [
  // Japanese
  {id:1,cuisine:"Japanese 🇯🇵",place:"Nori - Modern Izakaya",area:"Q1 / Bến Thành",type:"Izakaya / Japanese dining",budget:"300k–700k",status:"want",rating:0,notes:"Dinner, drinks, late-night",mapsUrl:"https://maps.google.com/?q=Nori+Modern+Izakaya+114+L%C3%BD+T%E1%BB%B1+Tr%E1%BB%8Dng+Ho+Chi+Minh"},
  {id:2,cuisine:"Japanese 🇯🇵",place:"Sushi Hokkaido Sachi",area:"Q1 / Takashimaya",type:"Sushi / sashimi",budget:"400k–900k",status:"want",rating:0,notes:"Safe premium sushi pick",mapsUrl:"https://maps.google.com/?q=Sushi+Hokkaido+Sachi+Takashimaya+Ho+Chi+Minh"},
  {id:3,cuisine:"Japanese 🇯🇵",place:"Ippudo Ramen",area:"Q1 / Lê Thánh Tôn",type:"Ramen",budget:"250k–500k",status:"want",rating:0,notes:"Ramen chain; reliable",mapsUrl:"https://maps.google.com/?q=Ippudo+Ramen+17%2F5+L%C3%AA+Th%C3%A1nh+T%C3%B4n+Ho+Chi+Minh"},
  {id:4,cuisine:"Japanese 🇯🇵",place:"Futaba Ramen",area:"Q1 / Thái Văn Lung",type:"Ramen",budget:"200k–400k",status:"want",rating:0,notes:"Japanese Town option",mapsUrl:"https://maps.google.com/?q=Futaba+Ramen+Th%C3%A1i+V%C4%83n+Lung+Ho+Chi+Minh"},
  {id:5,cuisine:"Japanese 🇯🇵",place:"Danbo Ramen",area:"Q1",type:"Ramen",budget:"200k–450k",status:"want",rating:0,notes:"Casual ramen",mapsUrl:"https://maps.google.com/?q=Danbo+Ramen+Ho+Chi+Minh+City"},
  {id:6,cuisine:"Japanese 🇯🇵",place:"Mutahiro Ramen",area:"Q1",type:"Ramen",budget:"200k–450k",status:"want",rating:0,notes:"Rich ramen broth",mapsUrl:"https://maps.google.com/?q=Mutahiro+Ramen+Ho+Chi+Minh+City"},
  {id:7,cuisine:"Japanese 🇯🇵",place:"Fujiro Tonkatsu",area:"Q1",type:"Tonkatsu",budget:"250k–550k",status:"want",rating:0,notes:"Good pork cutlet set",mapsUrl:"https://maps.google.com/?q=Fujiro+Tonkatsu+Ho+Chi+Minh+City"},
  {id:8,cuisine:"Japanese 🇯🇵",place:"Izakaya Matsuki",area:"Q1 / Thái Văn Lung",type:"Izakaya",budget:"300k–700k",status:"want",rating:0,notes:"Good group dinner",mapsUrl:"https://maps.google.com/?q=Izakaya+Matsuki+8A%2FA20+Th%C3%A1i+V%C4%83n+Lung+Ho+Chi+Minh"},
  {id:9,cuisine:"Japanese 🇯🇵",place:"Metetsu Izakaya",area:"Q1 / Thái Văn Lung",type:"Izakaya",budget:"300k–700k",status:"want",rating:0,notes:"Japanese drinking food",mapsUrl:"https://maps.google.com/?q=Metetsu+Izakaya+Th%C3%A1i+V%C4%83n+Lung+Ho+Chi+Minh"},
  {id:10,cuisine:"Japanese 🇯🇵",place:"Izakaya Ten",area:"Q1 / Phan Xích Long",type:"Izakaya",budget:"300k–700k",status:"want",rating:0,notes:"Multiple locations",mapsUrl:"https://maps.google.com/?q=Izakaya+Ten+Ho+Chi+Minh"},
  {id:11,cuisine:"Japanese 🇯🇵",place:"Ebisu Shoten",area:"Q1",type:"Izakaya",budget:"250k–600k",status:"want",rating:0,notes:"Casual Japanese pub food",mapsUrl:"https://maps.google.com/?q=Ebisu+Shoten+Ho+Chi+Minh"},
  {id:12,cuisine:"Japanese 🇯🇵",place:"Sushi Tiger",area:"Q1",type:"Sushi",budget:"300k–800k",status:"want",rating:0,notes:"Sushi casual-premium",mapsUrl:"https://maps.google.com/?q=Sushi+Tiger+Ho+Chi+Minh"},
  {id:13,cuisine:"Japanese 🇯🇵",place:"Chikara Gyoza",area:"Q1",type:"Gyoza / izakaya",budget:"200k–500k",status:"want",rating:0,notes:"Good for snacks and drinks",mapsUrl:"https://maps.google.com/?q=Chikara+Gyoza+Ho+Chi+Minh"},
  {id:14,cuisine:"Japanese 🇯🇵",place:"Sukiya",area:"Multiple",type:"Japanese rice bowls",budget:"100k–250k",status:"want",rating:0,notes:"Cheap comfort food",mapsUrl:"https://maps.google.com/?q=Sukiya+Ho+Chi+Minh+City"},
  {id:15,cuisine:"Japanese 🇯🇵",place:"Maguro Studio",area:"Q1",type:"Sushi / tuna-focused",budget:"400k–900k",status:"want",rating:0,notes:"Premium but still under budget",mapsUrl:"https://maps.google.com/?q=Maguro+Studio+Ho+Chi+Minh+City"},
  {id:16,cuisine:"Japanese 🇯🇵",place:"Matsuri Japanese Restaurant",area:"Q1 / Nguyễn Huệ",type:"Japanese casual dining",budget:"250k–600k",status:"want",rating:0,notes:"Central location",mapsUrl:"https://maps.google.com/?q=Matsuri+Japanese+Restaurant+Nguy%E1%BB%85n+Hu%E1%BB%87+Ho+Chi+Minh"},
  {id:17,cuisine:"Japanese 🇯🇵",place:"Naked Sushi",area:"Q3 / Nam Kỳ Khởi Nghĩa",type:"Sushi",budget:"300k–800k",status:"want",rating:0,notes:"Modern sushi choice",mapsUrl:"https://maps.google.com/?q=Naked+Sushi+Nam+K%E1%BB%B3+Kh%E1%BB%9Fi+Ngh%C4%A9a+Ho+Chi+Minh"},
  {id:18,cuisine:"Japanese 🇯🇵",place:"Kimochi Sushi",area:"Bình Thạnh",type:"Sushi",budget:"200k–500k",status:"want",rating:0,notes:"Local sushi option",mapsUrl:"https://maps.google.com/?q=Kimochi+Sushi+Ng%C3%B4+T%E1%BA%A5t+T%E1%BB%91+B%C3%ACnh+Th%E1%BA%A1nh"},
  {id:19,cuisine:"Japanese 🇯🇵",place:"Tròn Kitchen",area:"Lê Văn Sỹ",type:"Japanese-inspired",budget:"200k–500k",status:"want",rating:0,notes:"Casual meal",mapsUrl:"https://maps.google.com/?q=Tr%C3%B2n+Kitchen+L%C3%AA+V%C4%83n+S%E1%BB%B9+Ho+Chi+Minh"},
  // Korean
  {id:20,cuisine:"Korean 🇰🇷",place:"BROS KOREA 1980s",area:"Q3 / Nguyễn Thị Diệu",type:"Korean BBQ",budget:"300k–700k",status:"want",rating:0,notes:"Very popular BBQ",mapsUrl:"https://maps.google.com/?q=BROS+KOREA+1980s+Nguy%E1%BB%85n+Th%E1%BB%8B+Di%E1%BB%87u+Ho+Chi+Minh"},
  {id:21,cuisine:"Korean 🇰🇷",place:"Midam Korean Premium BBQ",area:"Q1 / Thi Sách",type:"Korean BBQ",budget:"400k–900k",status:"want",rating:0,notes:"Premium BBQ but under 1m",mapsUrl:"https://maps.google.com/?q=Midam+Korean+Premium+BBQ+02+Thi+S%C3%A1ch+Ho+Chi+Minh"},
  {id:22,cuisine:"Korean 🇰🇷",place:"Palsaik BBQ",area:"Q1 / Đông Du",type:"Korean BBQ",budget:"400k–900k",status:"want",rating:0,notes:"Famous pork belly set",mapsUrl:"https://maps.google.com/?q=Palsaik+BBQ+%C4%90%C3%B4ng+Du+Ho+Chi+Minh"},
  {id:23,cuisine:"Korean 🇰🇷",place:"Doran Doran",area:"Q1 / Cô Bắc",type:"Korean home-style",budget:"250k–600k",status:"want",rating:0,notes:"Good non-BBQ option",mapsUrl:"https://maps.google.com/?q=Doran+Doran+Korean+Restaurant+C%C3%B4+B%E1%BA%AFc+Ho+Chi+Minh"},
  {id:24,cuisine:"Korean 🇰🇷",place:"Matchandeul BBQ",area:"Q7 / Phú Mỹ Hưng",type:"Korean BBQ",budget:"350k–800k",status:"want",rating:0,notes:"K-town style",mapsUrl:"https://maps.google.com/?q=Matchandeul+BBQ+Ho+Chi+Minh"},
  {id:25,cuisine:"Korean 🇰🇷",place:"Busan Korean Food",area:"Multiple",type:"Korean casual",budget:"150k–350k",status:"want",rating:0,notes:"Budget-friendly",mapsUrl:"https://maps.google.com/?q=Busan+Korean+Food+Ho+Chi+Minh"},
  {id:26,cuisine:"Korean 🇰🇷",place:"Hanuri",area:"Multiple",type:"Korean casual",budget:"120k–300k",status:"want",rating:0,notes:"Student-friendly",mapsUrl:"https://maps.google.com/?q=Hanuri+Korean+Food+Ho+Chi+Minh"},
  {id:27,cuisine:"Korean 🇰🇷",place:"GoGi House",area:"Multiple",type:"Korean BBQ chain",budget:"300k–700k",status:"want",rating:0,notes:"Easy group BBQ",mapsUrl:"https://maps.google.com/?q=GoGi+House+Ho+Chi+Minh"},
  {id:28,cuisine:"Korean 🇰🇷",place:"Yukssam BBQ",area:"Multiple",type:"Korean BBQ",budget:"300k–700k",status:"want",rating:0,notes:"BBQ + cold noodles",mapsUrl:"https://maps.google.com/?q=Yukssam+BBQ+Ho+Chi+Minh"},
  {id:29,cuisine:"Korean 🇰🇷",place:"Bornga",area:"Q1 / Q7",type:"Korean BBQ",budget:"400k–900k",status:"want",rating:0,notes:"Good meat quality",mapsUrl:"https://maps.google.com/?q=Bornga+Ho+Chi+Minh"},
  {id:30,cuisine:"Korean 🇰🇷",place:"Don Chicken",area:"Multiple",type:"Korean fried chicken",budget:"200k–450k",status:"want",rating:0,notes:"Chicken and beer vibe",mapsUrl:"https://maps.google.com/?q=Don+Chicken+Ho+Chi+Minh"},
  {id:31,cuisine:"Korean 🇰🇷",place:"Gaxeo Chicken",area:"Q1 / Q7",type:"Korean fried chicken",budget:"200k–500k",status:"want",rating:0,notes:"Good sharing plates",mapsUrl:"https://maps.google.com/?q=Gaxeo+Chicken+Ho+Chi+Minh"},
  {id:32,cuisine:"Korean 🇰🇷",place:"Kimbap FC",area:"Multiple",type:"Korean casual",budget:"100k–250k",status:"want",rating:0,notes:"Cheap quick meal",mapsUrl:"https://maps.google.com/?q=Kimbap+FC+Ho+Chi+Minh"},
  {id:33,cuisine:"Korean 🇰🇷",place:"Pacho Pocha",area:"Thảo Điền / Q2",type:"Korean pocha",budget:"250k–600k",status:"want",rating:0,notes:"Night-out style",mapsUrl:"https://maps.google.com/?q=Pacho+Pocha+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+Ho+Chi+Minh"},
  {id:34,cuisine:"Korean 🇰🇷",place:"Mabu-KKO Chi",area:"Q7 / Sky Garden",type:"Korean dining",budget:"250k–600k",status:"want",rating:0,notes:"Q7 Korean area",mapsUrl:"https://maps.google.com/?q=Mabu-KKO+Chi+Sky+Garden+Ho+Chi+Minh"},
  {id:35,cuisine:"Korean 🇰🇷",place:"G2 Chicken",area:"Thảo Điền / Q2",type:"Korean fried chicken",budget:"200k–500k",status:"want",rating:0,notes:"Chicken option in Thảo Điền",mapsUrl:"https://maps.google.com/?q=G2+Chicken+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+Ho+Chi+Minh"},
  // Thai
  {id:36,cuisine:"Thai 🇹🇭",place:"Lac Thai Restaurant",area:"Q1 / Mạc Thị Bưởi",type:"Thai restaurant",budget:"250k–600k",status:"want",rating:0,notes:"Classic Thai restaurant",mapsUrl:"https://maps.google.com/?q=Lac+Thai+Restaurant+M%E1%BA%A1c+Th%E1%BB%8B+B%C6%B0%E1%BB%9Fi+Ho+Chi+Minh"},
  {id:37,cuisine:"Thai 🇹🇭",place:"Somtam ZAAP",area:"Q1 / Pasteur",type:"Thai / som tam",budget:"200k–500k",status:"want",rating:0,notes:"Good Thai casual",mapsUrl:"https://maps.google.com/?q=Somtam+ZAAP+136+Pasteur+Ho+Chi+Minh"},
  {id:38,cuisine:"Thai 🇹🇭",place:"Koh Yam",area:"Q1 / Hồ Tùng Mậu",type:"Thai restaurant",budget:"200k–500k",status:"want",rating:0,notes:"Modern Thai chain",mapsUrl:"https://maps.google.com/?q=Koh+Yam+111+H%E1%BB%93+T%C3%B9ng+M%E1%BA%ADu+Ho+Chi+Minh"},
  {id:39,cuisine:"Thai 🇹🇭",place:"Golden Elephant",area:"Q1 / Hai Bà Trưng",type:"Thai restaurant",budget:"300k–700k",status:"want",rating:0,notes:"Traditional Thai",mapsUrl:"https://maps.google.com/?q=Golden+Elephant+Thai+Restaurant+Hai+B%C3%A0+Tr%C6%B0ng+Ho+Chi+Minh"},
  {id:40,cuisine:"Thai 🇹🇭",place:"Som Tum Thai",area:"Q1 / Takashimaya",type:"Thai restaurant",budget:"250k–600k",status:"want",rating:0,notes:"Convenient mall option",mapsUrl:"https://maps.google.com/?q=Som+Tum+Thai+Takashimaya+Ho+Chi+Minh"},
  {id:41,cuisine:"Thai 🇹🇭",place:"Mama Thai",area:"Q1 / Nguyễn Trãi",type:"Thai restaurant",budget:"200k–500k",status:"want",rating:0,notes:"Casual Thai",mapsUrl:"https://maps.google.com/?q=Mama+Thai+Nguy%E1%BB%85n+Tr%C3%A3i+Ho+Chi+Minh"},
  {id:42,cuisine:"Thai 🇹🇭",place:"TukTuk Thai Bistro",area:"Q1 / Q2",type:"Thai bistro",budget:"250k–650k",status:"want",rating:0,notes:"Good for group sharing",mapsUrl:"https://maps.google.com/?q=TukTuk+Thai+Bistro+Ho+Chi+Minh"},
  {id:43,cuisine:"Thai 🇹🇭",place:"Thai Market",area:"Multiple",type:"Thai casual",budget:"180k–400k",status:"want",rating:0,notes:"Good value Thai",mapsUrl:"https://maps.google.com/?q=Thai+Market+Ho+Chi+Minh"},
  {id:44,cuisine:"Thai 🇹🇭",place:"MK Restaurant",area:"Multiple",type:"Thai hotpot",budget:"250k–600k",status:"want",rating:0,notes:"Thai-style suki hotpot",mapsUrl:"https://maps.google.com/?q=MK+Restaurant+Ho+Chi+Minh"},
  {id:45,cuisine:"Thai 🇹🇭",place:"HiHi Thai Noodle",area:"Q3 / Nguyễn Đình Chiểu",type:"Thai noodles",budget:"100k–250k",status:"want",rating:0,notes:"Casual noodle option",mapsUrl:"https://maps.google.com/?q=H%E1%BB%A7+Ti%E1%BA%BFu+Th%C3%A1i+Lan+HiHi+Nguy%E1%BB%85n+%C4%90%C3%ACnh+Chi%E1%BB%83u+Ho+Chi+Minh"},
  // Chinese / HK
  {id:46,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Dim Tu Tac",area:"Q1 / Takashimaya",type:"Dim sum / Cantonese",budget:"350k–900k",status:"want",rating:0,notes:"Premium dimsum",mapsUrl:"https://maps.google.com/?q=Dim+Tu+Tac+Takashimaya+Ho+Chi+Minh"},
  {id:47,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Cửu Long Quán / Kowloon",area:"Q6 / Bùi Hữu Nghĩa",type:"Hong Kong food",budget:"200k–500k",status:"want",rating:0,notes:"Chợ Lớn vibe",mapsUrl:"https://maps.google.com/?q=C%E1%BB%ADu+Long+Qu%C3%A1n+76+B%C3%B9i+H%E1%BB%AFu+Ngh%C4%A9a+Ho+Chi+Minh"},
  {id:48,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Baoz Dimsum",area:"Multiple",type:"Dim sum",budget:"250k–600k",status:"want",rating:0,notes:"Accessible dimsum chain",mapsUrl:"https://maps.google.com/?q=Baoz+Dimsum+Ho+Chi+Minh"},
  {id:49,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Crystal Jade",area:"Q1 / Q7",type:"Cantonese",budget:"350k–900k",status:"want",rating:0,notes:"Mall Cantonese option",mapsUrl:"https://maps.google.com/?q=Crystal+Jade+Ho+Chi+Minh"},
  {id:50,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"San Fu Lou",area:"Q1 / Q7",type:"Cantonese / dimsum",budget:"300k–700k",status:"want",rating:0,notes:"Reliable Chinese food",mapsUrl:"https://maps.google.com/?q=San+Fu+Lou+Ho+Chi+Minh"},
  {id:51,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Tân Hải Vân",area:"Q1 / Q5",type:"Chinese-Vietnamese",budget:"200k–500k",status:"want",rating:0,notes:"Late meal option",mapsUrl:"https://maps.google.com/?q=T%C3%A2n+H%E1%BA%A3i+V%C3%A2n+Ho+Chi+Minh"},
  {id:52,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Hải Ký Mì Gia",area:"Q5",type:"Noodles / wonton",budget:"100k–250k",status:"want",rating:0,notes:"Chợ Lớn classic",mapsUrl:"https://maps.google.com/?q=H%E1%BA%A3i+K%C3%BD+M%C3%AC+Gia+Ho+Chi+Minh"},
  {id:53,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Tim Ho Wan",area:"Q1",type:"Hong Kong dimsum",budget:"300k–700k",status:"want",rating:0,notes:"Famous dimsum brand",mapsUrl:"https://maps.google.com/?q=Tim+Ho+Wan+Ho+Chi+Minh"},
  {id:54,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Long Triều",area:"Q1",type:"Cantonese",budget:"500k–1000k",status:"want",rating:0,notes:"Higher-end; order carefully under budget",mapsUrl:"https://maps.google.com/?q=Long+Tri%E1%BB%81u+Ho+Chi+Minh"},
  {id:55,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Bao Bei",area:"Q1",type:"Chinese modern",budget:"300k–700k",status:"want",rating:0,notes:"Modern Chinese",mapsUrl:"https://maps.google.com/?q=Bao+Bei+Ho+Chi+Minh"},
  {id:56,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Dimsum Ông Sủi",area:"Q5 / Châu Văn Liêm",type:"Dim sum",budget:"150k–400k",status:"want",rating:0,notes:"Chợ Lớn casual dimsum",mapsUrl:"https://maps.google.com/?q=Dimsum+%C3%94ng+S%E1%BB%A7i+26+Ch%C3%A2u+V%C4%83n+Li%C3%AAm+Ho+Chi+Minh"},
  {id:57,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Sủi Cảo Ngọc Ý",area:"Q11 / Hà Tôn Quyền",type:"Dumplings",budget:"100k–250k",status:"want",rating:0,notes:"Classic dumpling street",mapsUrl:"https://maps.google.com/?q=S%E1%BB%A7i+C%E1%BA%A3o+Ng%E1%BB%8Dc+%C3%9D+H%C3%A0+T%C3%B4n+Quy%E1%BB%81n+Ho+Chi+Minh"},
  {id:58,cuisine:"Chinese / HK 🇨🇳🇭🇰",place:"Tân Tòng Lợi",area:"Q3 / Võ Văn Tần",type:"Dumplings / noodles",budget:"100k–250k",status:"want",rating:0,notes:"Casual sủi cảo",mapsUrl:"https://maps.google.com/?q=S%E1%BB%A7i+C%E1%BA%A3o+T%C3%A2n+T%C3%B2ng+L%E1%BB%A3i+V%C3%B5+V%C4%83n+T%E1%BA%A7n+Ho+Chi+Minh"},
  // Italian
  {id:59,cuisine:"Italian 🇮🇹",place:"Pizza 4P's",area:"Multiple",type:"Pizza / pasta",budget:"300k–700k",status:"want",rating:0,notes:"Must-try in Saigon",mapsUrl:"https://maps.google.com/?q=Pizza+4P%27s+Ho+Chi+Minh"},
  {id:60,cuisine:"Italian 🇮🇹",place:"Truffle & Co.",area:"Q1 / Mạc Thị Bưởi",type:"Italian / pasta",budget:"350k–800k",status:"want",rating:0,notes:"Truffle pasta option",mapsUrl:"https://maps.google.com/?q=Truffle+%26+Co+M%E1%BA%A1c+Th%E1%BB%8B+B%C6%B0%E1%BB%9Fi+Ho+Chi+Minh"},
  {id:61,cuisine:"Italian 🇮🇹",place:"PASTA CLUB Not so Italian",area:"Q1 / Hai Bà Trưng",type:"Pasta",budget:"250k–600k",status:"want",rating:0,notes:"Fun casual pasta",mapsUrl:"https://maps.google.com/?q=PASTA+CLUB+Not+so+Italian+Hai+B%C3%A0+Tr%C6%B0ng+Ho+Chi+Minh"},
  {id:62,cuisine:"Italian 🇮🇹",place:"Pendolasco",area:"Q1 / Thảo Điền",type:"Italian",budget:"400k–900k",status:"want",rating:0,notes:"Classic Italian pick",mapsUrl:"https://maps.google.com/?q=Pendolasco+Ho+Chi+Minh"},
  {id:63,cuisine:"Italian 🇮🇹",place:"Basta Hiro",area:"Q1",type:"Italian / pizza",budget:"350k–800k",status:"want",rating:0,notes:"Central Italian option",mapsUrl:"https://maps.google.com/?q=Basta+Hiro+Ho+Chi+Minh"},
  {id:64,cuisine:"Italian 🇮🇹",place:"Opera Italian Restaurant",area:"Q1",type:"Italian fine casual",budget:"500k–1000k",status:"want",rating:0,notes:"Good for date night",mapsUrl:"https://maps.google.com/?q=Opera+Italian+Restaurant+Ho+Chi+Minh"},
  {id:65,cuisine:"Italian 🇮🇹",place:"Ciao Bella",area:"Q1",type:"Italian",budget:"350k–800k",status:"want",rating:0,notes:"Comfort Italian",mapsUrl:"https://maps.google.com/?q=Ciao+Bella+Ho+Chi+Minh"},
  {id:66,cuisine:"Italian 🇮🇹",place:"Aperitivo",area:"Thảo Điền / Q2",type:"Italian / wine bar",budget:"400k–900k",status:"want",rating:0,notes:"Thảo Điền option",mapsUrl:"https://maps.google.com/?q=Aperitivo+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+Ho+Chi+Minh"},
  {id:67,cuisine:"Italian 🇮🇹",place:"Brix Restaurant",area:"Thảo Điền / Q2",type:"Western / Italian-ish",budget:"500k–1000k",status:"want",rating:0,notes:"Brunch/dinner vibe",mapsUrl:"https://maps.google.com/?q=Brix+Restaurant+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+Ho+Chi+Minh"},
  // Spanish
  {id:68,cuisine:"Spanish 🇪🇸",place:"Tomatito",area:"Q1",type:"Spanish tapas",budget:"400k–900k",status:"want",rating:0,notes:"Tapas and drinks",mapsUrl:"https://maps.google.com/?q=Tomatito+Saigon+Ho+Chi+Minh"},
  {id:69,cuisine:"Spanish 🇪🇸",place:"Iberico",area:"Q1 / Q2",type:"Spanish / Mediterranean",budget:"400k–900k",status:"want",rating:0,notes:"Tapas sharing",mapsUrl:"https://maps.google.com/?q=Iberico+Ho+Chi+Minh"},
  {id:70,cuisine:"Spanish 🇪🇸",place:"La Fiesta",area:"Q1",type:"Mexican / Tex-Mex",budget:"250k–600k",status:"want",rating:0,notes:"Casual Latin food",mapsUrl:"https://maps.google.com/?q=La+Fiesta+Ho+Chi+Minh"},
  {id:71,cuisine:"Spanish 🇪🇸",place:"Octo Tapas",area:"Q1",type:"Spanish tapas",budget:"400k–900k",status:"want",rating:0,notes:"Stylish tapas",mapsUrl:"https://maps.google.com/?q=Octo+Tapas+Ho+Chi+Minh"},
  // Mexican
  {id:72,cuisine:"Mexican 🇲🇽",place:"District Federal",area:"Thảo Điền / Q2",type:"Mexican",budget:"250k–600k",status:"want",rating:0,notes:"Good tacos",mapsUrl:"https://maps.google.com/?q=District+Federal+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+Ho+Chi+Minh"},
  {id:73,cuisine:"Mexican 🇲🇽",place:"Tippy's",area:"Thảo Điền / Q2",type:"Mexican",budget:"250k–600k",status:"want",rating:0,notes:"Casual Mexican",mapsUrl:"https://maps.google.com/?q=Tippy%27s+Mexican+Food+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+Ho+Chi+Minh"},
  {id:74,cuisine:"Mexican 🇲🇽",place:"Rico Taco",area:"Q1",type:"Mexican",budget:"200k–500k",status:"want",rating:0,notes:"Taco option",mapsUrl:"https://maps.google.com/?q=Rico+Taco+Ho+Chi+Minh"},
  {id:75,cuisine:"Mexican 🇲🇽",place:"Gringo Tacos",area:"Q1 / Q2",type:"Tacos",budget:"200k–500k",status:"want",rating:0,notes:"Casual tacos",mapsUrl:"https://maps.google.com/?q=Gringo+Tacos+Ho+Chi+Minh"},
  {id:76,cuisine:"Mexican 🇲🇽",place:"TacoLeo",area:"Q1",type:"Tacos",budget:"150k–400k",status:"want",rating:0,notes:"Quick taco meal",mapsUrl:"https://maps.google.com/?q=TacoLeo+Ho+Chi+Minh"},
  {id:77,cuisine:"Mexican 🇲🇽",place:"Mexcla",area:"Q1",type:"Mexican",budget:"200k–500k",status:"want",rating:0,notes:"Mexican casual",mapsUrl:"https://maps.google.com/?q=Mexcla+Ho+Chi+Minh"},
  // French
  {id:78,cuisine:"French 🇫🇷",place:"Le Corto",area:"Q1",type:"French dining",budget:"600k–1000k",status:"want",rating:0,notes:"Higher-end French",mapsUrl:"https://maps.google.com/?q=Le+Corto+Ho+Chi+Minh"},
  {id:79,cuisine:"French 🇫🇷",place:"Cocotte",area:"Q1 / Q2",type:"French bistro",budget:"250k–700k",status:"want",rating:0,notes:"Comfort French food",mapsUrl:"https://maps.google.com/?q=Cocotte+Ho+Chi+Minh"},
  {id:80,cuisine:"French 🇫🇷",place:"L'Usine",area:"Q1 / Q2",type:"Bistro / cafe",budget:"250k–600k",status:"want",rating:0,notes:"Cafe and brunch",mapsUrl:"https://maps.google.com/?q=L%27Usine+Ho+Chi+Minh"},
  {id:81,cuisine:"French 🇫🇷",place:"Paul Bakery",area:"Q1",type:"Bakery / cafe",budget:"150k–400k",status:"want",rating:0,notes:"Dessert/cafe stop",mapsUrl:"https://maps.google.com/?q=Paul+Bakery+Ho+Chi+Minh"},
  // American
  {id:82,cuisine:"American 🇺🇸",place:"Eddie's Diner",area:"Q1 / Pasteur",type:"American diner",budget:"250k–600k",status:"want",rating:0,notes:"Burgers, shakes, breakfast",mapsUrl:"https://maps.google.com/?q=Eddie%27s+Diner+73+Pasteur+Ho+Chi+Minh"},
  {id:83,cuisine:"American 🇺🇸",place:"Gummy Chicken Steak",area:"Q3 / Võ Văn Tần",type:"Chicken steak",budget:"150k–350k",status:"want",rating:0,notes:"Budget western meal",mapsUrl:"https://maps.google.com/?q=Gummy+Chicken+Steak+V%C3%B5+V%C4%83n+T%E1%BA%A7n+Ho+Chi+Minh"},
  {id:84,cuisine:"American 🇺🇸",place:"Quan Ut Ut",area:"Q1 / Q2",type:"BBQ / smokehouse",budget:"300k–700k",status:"want",rating:0,notes:"Meat sharing plates",mapsUrl:"https://maps.google.com/?q=Quan+Ut+Ut+Ho+Chi+Minh"},
  {id:85,cuisine:"American 🇺🇸",place:"Chicago Steakhouse",area:"Q1",type:"Steak",budget:"500k–1000k",status:"want",rating:0,notes:"Choose carefully under 1m",mapsUrl:"https://maps.google.com/?q=Chicago+Steakhouse+Ho+Chi+Minh"},
  {id:86,cuisine:"American 🇺🇸",place:"The Wagon Wheel",area:"Q1",type:"American comfort food",budget:"300k–700k",status:"want",rating:0,notes:"Southern-style food",mapsUrl:"https://maps.google.com/?q=The+Wagon+Wheel+Ho+Chi+Minh"},
  {id:87,cuisine:"American 🇺🇸",place:"Hard Rock Cafe",area:"Q1",type:"American dining",budget:"350k–800k",status:"want",rating:0,notes:"Touristy but fun",mapsUrl:"https://maps.google.com/?q=Hard+Rock+Cafe+Ho+Chi+Minh"},
  {id:88,cuisine:"American 🇺🇸",place:"Marcel Gourmet Burger",area:"Q1 / Q2",type:"Burger",budget:"250k–600k",status:"want",rating:0,notes:"Good burger pick",mapsUrl:"https://maps.google.com/?q=Marcel+Gourmet+Burger+Ho+Chi+Minh"},
  {id:89,cuisine:"American 🇺🇸",place:"Chucks Burger",area:"Thảo Điền / Q2",type:"Burger",budget:"200k–500k",status:"want",rating:0,notes:"Casual burger",mapsUrl:"https://maps.google.com/?q=Chucks+Burger+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+Ho+Chi+Minh"},
  // Indian
  {id:90,cuisine:"Indian 🇮🇳",place:"Baba's Kitchen",area:"Q1",type:"Indian",budget:"250k–600k",status:"want",rating:0,notes:"Long-time Indian spot",mapsUrl:"https://maps.google.com/?q=Baba%27s+Kitchen+Ho+Chi+Minh"},
  {id:91,cuisine:"Indian 🇮🇳",place:"Tandoor",area:"Q1",type:"Indian",budget:"300k–700k",status:"want",rating:0,notes:"Classic Indian dining",mapsUrl:"https://maps.google.com/?q=Tandoor+Indian+Restaurant+Ho+Chi+Minh"},
  {id:92,cuisine:"Indian 🇮🇳",place:"Benaras",area:"Q1",type:"Indian",budget:"400k–900k",status:"want",rating:0,notes:"Premium Indian",mapsUrl:"https://maps.google.com/?q=Benaras+Indian+Restaurant+Ho+Chi+Minh"},
  {id:93,cuisine:"Indian 🇮🇳",place:"Ganesh",area:"Q1 / Q2",type:"Indian",budget:"250k–600k",status:"want",rating:0,notes:"Reliable Indian",mapsUrl:"https://maps.google.com/?q=Ganesh+Indian+Restaurant+Ho+Chi+Minh"},
  {id:94,cuisine:"Indian 🇮🇳",place:"Mustard",area:"Thảo Điền / Q2",type:"Indian",budget:"250k–600k",status:"want",rating:0,notes:"Thảo Điền Indian option",mapsUrl:"https://maps.google.com/?q=Mustard+Indian+Restaurant+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+Ho+Chi+Minh"},
  {id:95,cuisine:"Indian 🇮🇳",place:"Saffron",area:"Q1",type:"Indian / Mediterranean",budget:"350k–800k",status:"want",rating:0,notes:"Nice dinner vibe",mapsUrl:"https://maps.google.com/?q=Saffron+Ho+Chi+Minh"},
  // Malaysia / Singapore
  {id:96,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Mamak Malaysian",area:"Q1",type:"Malaysian",budget:"200k–500k",status:"want",rating:0,notes:"Malaysian comfort food",mapsUrl:"https://maps.google.com/?q=Mamak+Malaysian+Ho+Chi+Minh"},
  {id:97,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Penang Food Village",area:"Q1 / Q7",type:"Malaysian / Singaporean",budget:"200k–500k",status:"want",rating:0,notes:"Casual hawker-style",mapsUrl:"https://maps.google.com/?q=Penang+Food+Village+Ho+Chi+Minh"},
  {id:98,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Old Street Bak Kut Teh",area:"Q1",type:"Singaporean bak kut teh",budget:"250k–600k",status:"want",rating:0,notes:"Soup/rice meal",mapsUrl:"https://maps.google.com/?q=Old+Street+Bak+Kut+Teh+Ho+Chi+Minh"},
  {id:99,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Song Fa Bak Kut Teh",area:"Q1",type:"Singaporean bak kut teh",budget:"250k–600k",status:"want",rating:0,notes:"Popular Singapore brand",mapsUrl:"https://maps.google.com/?q=Song+Fa+Bak+Kut+Teh+Ho+Chi+Minh"},
  // Indonesia
  {id:100,cuisine:"Indonesia 🇮🇩",place:"Warung Indo",area:"Q1",type:"Indonesian",budget:"150k–400k",status:"want",rating:0,notes:"Indonesian casual",mapsUrl:"https://maps.google.com/?q=Warung+Indo+Ho+Chi+Minh"},
  {id:101,cuisine:"Indonesia 🇮🇩",place:"Bali in Saigon",area:"Thảo Điền / Q2",type:"Indonesian / Balinese",budget:"200k–500k",status:"want",rating:0,notes:"Balinese-style dishes",mapsUrl:"https://maps.google.com/?q=Bali+in+Saigon+Ho+Chi+Minh"},
  {id:102,cuisine:"Indonesia 🇮🇩",place:"Dapur Indo",area:"Q1",type:"Indonesian",budget:"150k–400k",status:"want",rating:0,notes:"Casual Indo pick",mapsUrl:"https://maps.google.com/?q=Dapur+Indo+Ho+Chi+Minh"},
  // Middle Eastern
  {id:103,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Kebaby",area:"Thảo Điền / Q2",type:"Kebab / Middle Eastern",budget:"120k–300k",status:"want",rating:0,notes:"Budget-friendly",mapsUrl:"https://maps.google.com/?q=Kebaby+Ho+Chi+Minh"},
  {id:104,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Al Sham",area:"Q1",type:"Syrian / Middle Eastern",budget:"250k–600k",status:"want",rating:0,notes:"Good for sharing",mapsUrl:"https://maps.google.com/?q=Al+Sham+Restaurant+Ho+Chi+Minh"},
  {id:105,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Pasha Turkish",area:"Thảo Điền / Q2",type:"Turkish",budget:"300k–700k",status:"want",rating:0,notes:"Turkish dining",mapsUrl:"https://maps.google.com/?q=Pasha+Turkish+Restaurant+Ho+Chi+Minh"},
  {id:106,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Beirut Restaurant",area:"Q1",type:"Lebanese",budget:"300k–700k",status:"want",rating:0,notes:"Lebanese sharing plates",mapsUrl:"https://maps.google.com/?q=Beirut+Restaurant+Ho+Chi+Minh"},
  {id:107,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Hummus & Grill",area:"Thảo Điền / Q2",type:"Middle Eastern",budget:"200k–500k",status:"want",rating:0,notes:"Healthy casual",mapsUrl:"https://maps.google.com/?q=Hummus+%26+Grill+Ho+Chi+Minh"},
  {id:108,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Sultan Kebab",area:"Multiple",type:"Turkish kebab",budget:"100k–250k",status:"want",rating:0,notes:"Quick kebab meal",mapsUrl:"https://maps.google.com/?q=Sultan+Kebab+Ho+Chi+Minh"},
  // Vietnamese
  {id:109,cuisine:"Vietnamese 🇻🇳",place:"Anan Saigon",area:"Q1",type:"Modern Vietnamese",budget:"800k–1000k",status:"want",rating:0,notes:"Book ahead; careful with budget",mapsUrl:"https://maps.google.com/?q=Anan+Saigon+Ho+Chi+Minh"},
  {id:110,cuisine:"Vietnamese 🇻🇳",place:"Bếp Mẹ Ỉn",area:"Q1",type:"Vietnamese home-style",budget:"200k–500k",status:"want",rating:0,notes:"Good for visitors",mapsUrl:"https://maps.google.com/?q=B%E1%BA%BFp+M%E1%BA%B9+%E1%BB%88n+Ho+Chi+Minh"},
  {id:111,cuisine:"Vietnamese 🇻🇳",place:"Quán Bụi",area:"Q1 / Q2",type:"Vietnamese restaurant",budget:"250k–600k",status:"want",rating:0,notes:"Good family-style Vietnamese",mapsUrl:"https://maps.google.com/?q=Qu%C3%A1n+B%E1%BB%A5i+Ho+Chi+Minh"},
  {id:112,cuisine:"Vietnamese 🇻🇳",place:"Secret Garden",area:"Q1",type:"Vietnamese restaurant",budget:"250k–600k",status:"want",rating:0,notes:"Rooftop-style Vietnamese",mapsUrl:"https://maps.google.com/?q=Secret+Garden+Ho+Chi+Minh"},
  {id:113,cuisine:"Vietnamese 🇻🇳",place:"Cục Gạch Quán",area:"Q1",type:"Vietnamese home-style",budget:"350k–800k",status:"want",rating:0,notes:"Classic Vietnamese dining",mapsUrl:"https://maps.google.com/?q=C%E1%BB%A5c+G%E1%BA%A1ch+Qu%C3%A1n+Ho+Chi+Minh"},
  {id:114,cuisine:"Vietnamese 🇻🇳",place:"Hoa Túc",area:"Q1",type:"Vietnamese modern",budget:"350k–800k",status:"want",rating:0,notes:"Nice setting",mapsUrl:"https://maps.google.com/?q=Hoa+T%C3%BAc+Ho+Chi+Minh"},
  {id:115,cuisine:"Vietnamese 🇻🇳",place:"Hum Vegetarian",area:"Q2 / Q3",type:"Vegetarian Vietnamese",budget:"250k–600k",status:"want",rating:0,notes:"Good vegetarian option",mapsUrl:"https://maps.google.com/?q=Hum+Vegetarian+Ho+Chi+Minh"},
  {id:116,cuisine:"Vietnamese 🇻🇳",place:"Chay Garden",area:"Q3",type:"Vegetarian Vietnamese",budget:"250k–600k",status:"want",rating:0,notes:"Vegetarian dinner",mapsUrl:"https://maps.google.com/?q=Chay+Garden+Ho+Chi+Minh"},
  {id:117,cuisine:"Vietnamese 🇻🇳",place:"Mặn Mòi",area:"Q1 / Q3",type:"Vietnamese dining",budget:"250k–600k",status:"want",rating:0,notes:"Good family meal",mapsUrl:"https://maps.google.com/?q=M%E1%BA%B7n+M%C3%B2i+Ho+Chi+Minh"},
  {id:118,cuisine:"Vietnamese 🇻🇳",place:"Nén Light",area:"Q1",type:"Modern Vietnamese",budget:"700k–1000k",status:"want",rating:0,notes:"Tasting-style; check menu",mapsUrl:"https://maps.google.com/?q=N%C3%A9n+Light+Ho+Chi+Minh"},
  {id:119,cuisine:"Vietnamese 🇻🇳",place:"Phở Gia Hân",area:"Bình Thạnh / Chu Văn An",type:"Phở",budget:"60k–120k",status:"want",rating:0,notes:"Local phở pick",mapsUrl:"https://maps.google.com/?q=Ph%E1%BB%9F+Gia+H%C3%A2n+Chu+V%C4%83n+An+B%C3%ACnh+Th%E1%BA%A1nh"},
  {id:120,cuisine:"Vietnamese 🇻🇳",place:"Phở Chú Hải",area:"Q1 / Trần Khánh Dư",type:"Phở / late night",budget:"70k–150k",status:"want",rating:0,notes:"Late-night phở",mapsUrl:"https://maps.google.com/?q=Ph%E1%BB%9F+Ch%C3%BA+H%E1%BA%A3i+53%2F64+Tr%E1%BA%A7n+Kh%C3%A1nh+D%C6%B0+Qu%E1%BA%ADn+1"},
  {id:121,cuisine:"Vietnamese 🇻🇳",place:"Phở Miến Gà Kỳ Đồng",area:"Q3 / Kỳ Đồng",type:"Chicken phở / miến",budget:"70k–150k",status:"want",rating:0,notes:"Classic chicken noodle",mapsUrl:"https://maps.google.com/?q=Ph%E1%BB%9F+Mi%E1%BA%BFn+G%C3%A0+K%E1%BB%B3+%C4%90%E1%BB%93ng+14%2F5+K%E1%BB%B3+%C4%90%E1%BB%93ng+Qu%E1%BA%ADn+3"},
  {id:122,cuisine:"Vietnamese 🇻🇳",place:"Hủ Tiếu Thành Đạt",area:"Q1 / Cô Bắc",type:"Hủ tiếu",budget:"60k–120k",status:"want",rating:0,notes:"Casual breakfast/lunch",mapsUrl:"https://maps.google.com/?q=H%E1%BB%A7+Ti%E1%BA%BFu+Th%C3%A0nh+%C4%90%E1%BA%A1t+C%C3%B4+B%E1%BA%AFc+Qu%E1%BA%ADn+1"},
  {id:123,cuisine:"Vietnamese 🇻🇳",place:"Bún Chả Vân Anh",area:"Tân Bình / Hồng Hà",type:"Bún chả",budget:"70k–150k",status:"want",rating:0,notes:"Near airport area",mapsUrl:"https://maps.google.com/?q=B%C3%BAn+Ch%E1%BA%A3+V%C3%A2n+Anh+36+H%E1%BB%93ng+H%C3%A0+T%C3%A2n+B%C3%ACnh"},
  {id:124,cuisine:"Vietnamese 🇻🇳",place:"Bún Thịt Nướng Kiều Bảo",area:"Q1 / Đề Thám",type:"Bún thịt nướng",budget:"60k–120k",status:"want",rating:0,notes:"Quick Vietnamese meal",mapsUrl:"https://maps.google.com/?q=B%C3%BAn+Th%E1%BB%8Bt+N%C6%B0%E1%BB%9Bng+Ki%E1%BB%81u+B%E1%BA%A3o+%C4%90%E1%BB%81+Th%C3%A1m+Qu%E1%BA%ADn+1"},
  {id:125,cuisine:"Vietnamese 🇻🇳",place:"Bún Đậu Ngọc Hà",area:"Bình Thạnh / Lê Quang Định",type:"Bún đậu",budget:"80k–180k",status:"want",rating:0,notes:"Northern-style snack meal",mapsUrl:"https://maps.google.com/?q=B%C3%BAn+%C4%90%E1%BA%ADu+Ng%E1%BB%8Dc+H%C3%A0+L%C3%AA+Quang+%C4%90%E1%BB%8Bnh+B%C3%ACnh+Th%E1%BA%A1nh"},
  {id:126,cuisine:"Vietnamese 🇻🇳",place:"Cơm Tấm Huyền",area:"Bình Thạnh / Lê Văn Duyệt",type:"Cơm tấm / late night",budget:"70k–150k",status:"want",rating:0,notes:"Late-night cơm tấm",mapsUrl:"https://maps.google.com/?q=C%C6%A1m+T%E1%BA%A5m+Huy%E1%BB%81n+L%C3%AA+V%C4%83n+Duy%E1%BB%87t+B%C3%ACnh+Th%E1%BA%A1nh"},
  {id:127,cuisine:"Vietnamese 🇻🇳",place:"Cơm Tấm Nạc Giòn",area:"Phú Nhuận / Nguyễn Đình Chính",type:"Cơm tấm",budget:"70k–150k",status:"want",rating:0,notes:"Crispy pork option",mapsUrl:"https://maps.google.com/?q=C%C6%A1m+T%E1%BA%A5m+N%E1%BA%A1c+Gi%C3%B2n+33%2F16+Nguy%E1%BB%85n+%C4%90%C3%ACnh+Ch%C3%ADnh+Ph%C3%BA+Nhu%E1%BA%ADn"},
  {id:128,cuisine:"Vietnamese 🇻🇳",place:"Cơm Gà Thanh",area:"Q5 / Nguyễn Trãi",type:"Chicken rice",budget:"70k–150k",status:"want",rating:0,notes:"Chợ Lớn comfort food",mapsUrl:"https://maps.google.com/?q=C%C6%A1m+G%C3%A0+Thanh+214%2F1+Nguy%E1%BB%85n+Tr%C3%A3i+Qu%E1%BA%ADn+5"},
  {id:129,cuisine:"Vietnamese 🇻🇳",place:"Xôi Bát",area:"Bình Thạnh / Hoàng Hoa Thám",type:"Xôi",budget:"60k–150k",status:"want",rating:0,notes:"Modern xôi bowl",mapsUrl:"https://maps.google.com/?q=X%C3%B4i+B%C3%A1t+Ho%C3%A0ng+Hoa+Th%C3%A1m+B%C3%ACnh+Th%E1%BA%A1nh"},
  {id:130,cuisine:"Vietnamese 🇻🇳",place:"Bò Lá Lốt Đường Ray",area:"Phú Nhuận / Nguyễn Văn Trỗi",type:"Bò lá lốt",budget:"80k–180k",status:"want",rating:0,notes:"Street-food style",mapsUrl:"https://maps.google.com/?q=B%C3%B2+L%C3%A1+L%E1%BB%91t+80%2F23+Nguy%E1%BB%85n+V%C4%83n+Tr%E1%BB%97i+Ph%C3%BA+Nhu%E1%BA%ADn"},
  // Cafe / Brunch
  {id:131,cuisine:"Cafe / Brunch ☕",place:"I Hate Monday",area:"Thảo Điền / Q2",type:"Cafe / brunch",budget:"200k–500k",status:"want",rating:0,notes:"Good brunch/cafe stop",mapsUrl:"https://maps.google.com/?q=I+Hate+Monday+Nguy%E1%BB%85n+Duy+Hi%E1%BB%87u+Th%E1%BA%A3o+%C4%90i%E1%BB%81n"},
  {id:132,cuisine:"Cafe / Brunch ☕",place:"Today With You",area:"Thảo Điền / Q2",type:"Cafe / brunch",budget:"200k–500k",status:"want",rating:0,notes:"Cute cafe vibe",mapsUrl:"https://maps.google.com/?q=Today+With+You+Th%E1%BA%A3o+%C4%90i%E1%BB%81n"},
  {id:133,cuisine:"Cafe / Brunch ☕",place:"Zumwhere",area:"Thảo Điền / Q2",type:"Dining / drinks",budget:"250k–600k",status:"want",rating:0,notes:"Casual dinner/drinks",mapsUrl:"https://maps.google.com/?q=Zumwhere+Th%E1%BA%A3o+%C4%90i%E1%BB%81n"},
  {id:134,cuisine:"Cafe / Brunch ☕",place:"Society",area:"Q1 / Lý Tự Trọng",type:"Cafe / dining",budget:"250k–600k",status:"want",rating:0,notes:"Central dining/cafe",mapsUrl:"https://maps.google.com/?q=Society+26+L%C3%BD+T%E1%BB%B1+Tr%E1%BB%8Dng+Qu%E1%BA%ADn+1"},
  {id:135,cuisine:"Cafe / Brunch ☕",place:"Oliu Quán",area:"TP.HCM",type:"Cafe / dining",budget:"200k–500k",status:"want",rating:0,notes:"Casual option",mapsUrl:"https://maps.google.com/?q=Oliu+Qu%C3%A1n+TP.HCM"},
  {id:136,cuisine:"Cafe / Brunch ☕",place:"Sol Kitchen",area:"TP.HCM",type:"Modern dining",budget:"400k–900k",status:"want",rating:0,notes:"Date-night friendly",mapsUrl:"https://maps.google.com/?q=Sol+Kitchen+Ho+Chi+Minh"},
  {id:137,cuisine:"Cafe / Brunch ☕",place:"Aussie Meat",area:"CMT8",type:"Steak / meat",budget:"300k–800k",status:"want",rating:0,notes:"Meat-focused casual",mapsUrl:"https://maps.google.com/?q=Aussie+Meat+C%C3%A1ch+M%E1%BA%A1ng+Th%C3%A1ng+8+Ho+Chi+Minh"},
  {id:138,cuisine:"Cafe / Brunch ☕",place:"15 Grams Homemade Kitchen",area:"Q1",type:"Brunch / western",budget:"200k–500k",status:"want",rating:0,notes:"Cafe brunch",mapsUrl:"https://maps.google.com/?q=15+Grams+Homemade+Kitchen+Qu%E1%BA%ADn+1+Ho+Chi+Minh"},
];

// ── DISTRICT HELPER ──────────────────────────────────────────────────────
function getDistrict(area) {
  if (!area || area === "Multiple" || area === "TP.HCM" || area === "CMT8") return "Multiple / Other";
  if (area.includes("Thảo Điền") || (area.includes("Q2") && !area.includes("Q1"))) return "Q2 / Thảo Điền";
  if (area.startsWith("Q1") || area.includes("Q1")) return "Quận 1";
  if (area.startsWith("Q3") || area.includes("Q3") || area.includes("Lê Văn Sỹ")) return "Quận 3";
  if (area.startsWith("Q5") || area.includes("Q5")) return "Quận 5";
  if (area.startsWith("Q6")) return "Quận 6";
  if (area.startsWith("Q7") || area.includes("Q7")) return "Quận 7";
  if (area.startsWith("Q11")) return "Quận 11";
  if (area.includes("Bình Thạnh")) return "Bình Thạnh";
  if (area.includes("Phú Nhuận")) return "Phú Nhuận";
  if (area.includes("Tân Bình")) return "Tân Bình";
  return "Multiple / Other";
}

const ALL_DISTRICTS = ["All Districts", "Quận 1", "Q2 / Thảo Điền", "Quận 3", "Quận 5", "Quận 6", "Quận 7", "Quận 11", "Bình Thạnh", "Phú Nhuận", "Tân Bình", "Multiple / Other"];

// ── EMPTY FORM ───────────────────────────────────────────────────────────
function emptyForm() {
  return { place: "", area: "", cuisine: CUISINES[0], type: "", budget: "", status: "want", rating: 0, notes: "" };
}

// ── COLORS ───────────────────────────────────────────────────────────────
const C = {
  bg: "#f4f0e8",
  header: "#1c3d2e",
  headerDark: "#122a1e",
  gold: "#d4a020",
  goldLight: "#f5e8b0",
  green: "#2d6e4e",
  greenLight: "#a8d5c2",
  red: "#c73030",
  redLight: "#f5c0c0",
  amber: "#d4721a",
  amberLight: "#f8d5a8",
  white: "#ffffff",
  textDark: "#1a1a1a",
  textMid: "#555",
  textMuted: "#999",
  border: "#e0d8cc",
  cardBg: "#ffffff",
};

export default function HCMCFoodPassport() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [cuisineFilter, setCuisineFilter] = useState("All Cuisines");
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("hcmc-passport-v1");
        if (res) {
          const parsed = JSON.parse(res.value);
          setEntries(parsed.length ? parsed : INITIAL_DATA);
        } else {
          setEntries(INITIAL_DATA);
        }
      } catch { setEntries(INITIAL_DATA); }
      setLoading(false);
    })();
  }, []);

  async function persist(next) {
    setEntries(next);
    try { await window.storage.set("hcmc-passport-v1", JSON.stringify(next)); } catch {}
  }

  function cycleStatus(id) {
    persist(entries.map(e => {
      if (e.id !== id) return e;
      const next = e.status === "want" ? "tried" : e.status === "tried" ? "fav" : "want";
      return { ...e, status: next, rating: next === "want" ? 0 : e.rating };
    }));
  }

  function handleSubmit() {
    if (!form.place.trim()) return;
    if (editId !== null) {
      persist(entries.map(e => e.id === editId ? { ...form, id: editId } : e));
      setEditId(null);
    } else {
      persist([{ ...form, id: Date.now() }, ...entries]);
    }
    setForm(emptyForm());
    setShowForm(false);
  }

  function startEdit(e) { setForm({ ...e }); setEditId(e.id); setShowForm(true); }
  function deleteEntry(id) { if (!window.confirm("Remove this entry?")) return; persist(entries.filter(e => e.id !== id)); }

  const counts = {
    all: entries.length,
    want: entries.filter(e => e.status === "want").length,
    tried: entries.filter(e => e.status === "tried").length,
    fav: entries.filter(e => e.status === "fav").length,
  };
  const pct = entries.length ? Math.round(((counts.tried + counts.fav) / entries.length) * 100) : 0;

  const filtered = entries.filter(e => {
    if (filter !== "all" && e.status !== filter) return false;
    if (cuisineFilter !== "All Cuisines" && e.cuisine !== cuisineFilter) return false;
    if (districtFilter !== "All Districts" && getDistrict(e.area) !== districtFilter) return false;
    if (search && ![e.place, e.area, e.cuisine, e.type, e.notes].some(f => f?.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Inter:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .card { transition: transform 0.15s, box-shadow 0.15s; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.11) !important; }
    .stamp-tried { position:absolute; top:13px; right:13px; border:2.5px solid ${C.green}; border-radius:5px; padding:3px 7px; color:${C.green}; font-weight:700; font-size:9px; letter-spacing:2.5px; text-transform:uppercase; opacity:0.65; transform:rotate(9deg); pointer-events:none; font-family:Inter,sans-serif; }
    .stamp-fav { position:absolute; top:13px; right:13px; border:2.5px solid ${C.gold}; border-radius:5px; padding:3px 7px; color:${C.gold}; font-weight:700; font-size:9px; letter-spacing:2px; text-transform:uppercase; opacity:0.8; transform:rotate(9deg); pointer-events:none; font-family:Inter,sans-serif; }
    .tab { cursor:pointer; transition:all 0.15s; background:none; border:none; font-family:Inter,sans-serif; }
    .icon-btn { background:none; border:none; cursor:pointer; border-radius:6px; width:30px; height:30px; display:flex; align-items:center; justify-content:center; transition:background 0.1s; font-size:14px; }
    .icon-btn:hover { background:rgba(0,0,0,0.06); }
    .star { cursor:pointer; transition:transform 0.1s; display:inline-block; }
    .star:hover { transform:scale(1.25); }
    .cycle-btn { transition:all 0.15s; cursor:pointer; }
    .cycle-btn:hover { opacity:0.85; }
    input,select,textarea { font-family:Inter,sans-serif; color:${C.textDark}; }
    input:focus,select:focus,textarea:focus { outline:none; border-color:${C.header} !important; }
    select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; padding-right:28px !important; }
    .maps-btn:hover { background:${C.header} !important; color:white !important; }
    ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-thumb { background:#ccc; border-radius:3px; }
    .submit-btn:hover { background:${C.headerDark} !important; }
  `;

  if (loading) return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", fontFamily:"Inter,sans-serif", color:C.textMuted, background:C.bg }}>
      Loading your HCMC food passport…
    </div>
  );

  const statusConfig = {
    want: { color: C.amber, bg: "#fff8f0", border: C.amberLight, label: "Mark Tried ✓" },
    tried: { color: C.green, bg: "#f0faf5", border: C.greenLight, label: "⭐ Favourite" },
    fav: { color: C.gold, bg: "#fef9ea", border: C.goldLight, label: "↩ Reset" },
  };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"Inter,sans-serif" }}>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div style={{ background:C.header, color:"white", padding:"26px 24px 22px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:4, textTransform:"uppercase", opacity:0.5, marginBottom:5, fontWeight:500 }}>Thành phố Hồ Chí Minh</div>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, lineHeight:1.15, letterSpacing:"-0.3px" }}>Food Passport</h1>
              <div style={{ fontSize:12, opacity:0.55, marginTop:3 }}>138 spots · under 1,000,000 VND/person</div>
            </div>
            <button onClick={() => { setForm(emptyForm()); setEditId(null); setShowForm(true); }}
              style={{ background:C.gold, border:"none", color:"white", borderRadius:10, padding:"11px 18px", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"Inter,sans-serif", letterSpacing:"0.2px", whiteSpace:"nowrap" }}>
              + Add Spot
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display:"flex", gap:24, marginTop:20, flexWrap:"wrap" }}>
            {[["Total", counts.all, "white"], ["Tried", counts.tried, C.greenLight], ["⭐ Favourites", counts.fav, C.goldLight], ["To Try", counts.want, "#f8d5a8"]].map(([lbl, val, col]) => (
              <div key={lbl}>
                <div style={{ fontSize:24, fontWeight:700, color:col, fontFamily:"'Playfair Display',serif" }}>{val}</div>
                <div style={{ fontSize:10, opacity:0.55, textTransform:"uppercase", letterSpacing:1.5, marginTop:1, fontWeight:500 }}>{lbl}</div>
              </div>
            ))}
            <div style={{ marginLeft:"auto", display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end" }}>
              <div style={{ fontSize:12, opacity:0.6, marginBottom:4 }}>Completion</div>
              <div style={{ width:120, height:6, background:"rgba(255,255,255,0.2)", borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:`${pct}%`, height:"100%", background:C.gold, borderRadius:3, transition:"width 0.4s" }} />
              </div>
              <div style={{ fontSize:11, opacity:0.55, marginTop:3 }}>{pct}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 24px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          {/* Status tabs */}
          <div style={{ display:"flex", overflowX:"auto" }}>
            {[["all","All",counts.all],["want","🗺️ To Try",counts.want],["tried","✓ Tried",counts.tried],["fav","⭐ Favourites",counts.fav]].map(([val,lbl,cnt]) => (
              <button key={val} className="tab" onClick={() => setFilter(val)} style={{
                padding:"13px 15px", fontWeight:600, fontSize:13, whiteSpace:"nowrap",
                color: filter === val ? C.header : "#999",
                borderBottom: filter === val ? `2.5px solid ${C.header}` : "2.5px solid transparent",
              }}>
                {lbl} <span style={{ fontWeight:400, fontSize:11 }}>({cnt})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECONDARY FILTERS ── */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"10px 24px" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
          <select value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)}
            style={{ border:`1.5px solid ${C.border}`, borderRadius:8, padding:"8px 28px 8px 12px", fontSize:13, background:C.white, cursor:"pointer" }}>
            <option>All Cuisines</option>
            {CUISINES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}
            style={{ border:`1.5px solid ${C.border}`, borderRadius:8, padding:"8px 28px 8px 12px", fontSize:13, background:C.white, cursor:"pointer" }}>
            {ALL_DISTRICTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <input placeholder="Search restaurants, type, area…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ border:`1.5px solid ${C.border}`, borderRadius:8, padding:"8px 12px", fontSize:13, flex:1, minWidth:160, background:"#fafafa" }} />
          <span style={{ fontSize:12, color:C.textMuted, whiteSpace:"nowrap" }}>{filtered.length} results</span>
        </div>
      </div>

      {/* ── CARDS ── */}
      <div style={{ maxWidth:860, margin:"0 auto", padding:"22px 24px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"70px 0", color:C.textMuted }}>
            <div style={{ fontSize:44, marginBottom:14 }}>🍜</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, marginBottom:8, color:"#666" }}>Nothing found</div>
            <div style={{ fontSize:14 }}>Try a different filter or search term</div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(360px, 1fr))", gap:14 }}>
            {filtered.map(entry => {
              const sc = statusConfig[entry.status];
              return (
                <div key={entry.id} className="card" style={{ background:C.white, borderRadius:13, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", position:"relative" }}>
                  {/* Status stripe */}
                  <div style={{ height:4, background: entry.status==="fav" ? C.gold : entry.status==="tried" ? C.green : C.amber }} />
                  
                  <div style={{ padding:"14px 16px 10px" }}>
                    {/* Status stamps */}
                    {entry.status === "tried" && <div className="stamp-tried">✓ Visited</div>}
                    {entry.status === "fav" && <div className="stamp-fav">⭐ Fave</div>}

                    {/* Badges */}
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:9 }}>
                      <span style={{ background:CUISINE_BG[entry.cuisine]||"#f0f0f0", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:500, color:"#444" }}>
                        {entry.cuisine}
                      </span>
                      {entry.budget && (
                        <span style={{ background:"#f5f5f5", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:600, color:"#555" }}>
                          {entry.budget} đ
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, color:C.textDark, lineHeight:1.25, marginBottom:2, paddingRight: (entry.status!=="want") ? 66 : 0 }}>
                      {entry.place}
                    </h3>

                    {entry.area && <div style={{ fontSize:12, color:C.textMuted, marginBottom: entry.type ? 4 : 7 }}>📍 {entry.area}</div>}
                    {entry.type && <div style={{ fontSize:12, color:"#777", fontStyle:"italic", marginBottom:7 }}>{entry.type}</div>}

                    {/* Stars */}
                    {entry.status !== "want" && entry.rating > 0 && (
                      <div style={{ fontSize:16, marginBottom:6, letterSpacing:1 }}>
                        {"★".repeat(entry.rating)}<span style={{ color:"#e0e0e0" }}>{"★".repeat(5-entry.rating)}</span>
                      </div>
                    )}

                    {entry.notes && (
                      <div style={{ fontSize:12.5, color:"#666", lineHeight:1.55, background:"#fafafa", borderRadius:7, padding:"8px 10px", marginTop:4 }}>
                        {entry.notes}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div style={{ borderTop:`1px solid ${C.border}`, padding:"9px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:8 }}>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", flex:1 }}>
                      <button className="cycle-btn" onClick={() => cycleStatus(entry.id)} style={{
                        background:sc.bg, border:`1.5px solid ${sc.border}`, borderRadius:7,
                        padding:"5px 12px", fontSize:11, fontWeight:600, color:sc.color,
                        fontFamily:"Inter,sans-serif",
                      }}>
                        {sc.label}
                      </button>
                      {entry.mapsUrl && (
                        <a href={entry.mapsUrl} target="_blank" rel="noopener noreferrer" className="maps-btn"
                          style={{ background:"none", border:`1.5px solid ${C.border}`, borderRadius:7, padding:"5px 10px", fontSize:11, fontWeight:500, color:C.textMid, textDecoration:"none", transition:"all 0.15s" }}>
                          🗺 Maps
                        </a>
                      )}
                    </div>
                    <div style={{ display:"flex", gap:3 }}>
                      <button className="icon-btn" onClick={() => startEdit(entry)} title="Edit">✏️</button>
                      <button className="icon-btn" onClick={() => deleteEntry(entry.id)} title="Delete">🗑️</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {showForm && (
        <div onClick={e => e.target===e.currentTarget && setShowForm(false)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:200 }}>
          <div style={{ background:C.white, borderRadius:"20px 20px 0 0", width:"100%", maxWidth:560, padding:"24px 24px 30px", maxHeight:"92vh", overflowY:"auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:C.header }}>{editId ? "Edit Entry" : "Add a Spot"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:C.textMuted }}>✕</button>
            </div>

            {/* Status toggle */}
            <div style={{ display:"flex", background:"#f2f2f2", borderRadius:10, padding:4, marginBottom:16 }}>
              {[["want","🗺️ To Try"],["tried","✓ Tried"],["fav","⭐ Favourite"]].map(([val,lbl]) => (
                <button key={val} onClick={() => setForm(f => ({...f, status:val}))} style={{
                  flex:1, padding:"9px 6px", borderRadius:8, border:"none",
                  fontWeight:600, fontSize:12,
                  background: form.status===val ? (val==="fav"?C.gold:val==="tried"?C.green:C.amber) : "transparent",
                  color: form.status===val ? "white" : "#888",
                  cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.15s",
                }}>{lbl}</button>
              ))}
            </div>

            {/* Fields */}
            {[
              {label:"Place Name *", key:"place", placeholder:"e.g. Pizza 4P's"},
              {label:"Area / District", key:"area", placeholder:"e.g. Q1 / Hai Bà Trưng"},
              {label:"Type / Style", key:"type", placeholder:"e.g. Ramen, Korean BBQ, Dim sum…"},
              {label:"Budget/person (VND)", key:"budget", placeholder:"e.g. 200k–500k"},
            ].map(({label,key,placeholder}) => (
              <div key={key} style={{ marginBottom:13 }}>
                <label style={{ fontSize:11, fontWeight:600, color:"#555", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</label>
                <input placeholder={placeholder} value={form[key]}
                  onChange={e => setForm(f => ({...f, [key]:e.target.value}))}
                  style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:9, padding:"10px 12px", fontSize:14 }} />
              </div>
            ))}

            <div style={{ marginBottom:13 }}>
              <label style={{ fontSize:11, fontWeight:600, color:"#555", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Cuisine</label>
              <select value={form.cuisine} onChange={e => setForm(f => ({...f, cuisine:e.target.value}))}
                style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:9, padding:"10px 28px 10px 12px", fontSize:14, background:C.white }}>
                {CUISINES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {form.status !== "want" && (
              <div style={{ marginBottom:13 }}>
                <label style={{ fontSize:11, fontWeight:600, color:"#555", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:0.5 }}>Rating</label>
                <div style={{ display:"flex", gap:6 }}>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className="star" onClick={() => setForm(f => ({...f, rating:n}))}
                      style={{ fontSize:28, color: n<=form.rating?"#f0b429":"#ddd" }}>★</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, fontWeight:600, color:"#555", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Notes</label>
              <textarea placeholder="Tips, what to order, vibes…" value={form.notes}
                onChange={e => setForm(f => ({...f, notes:e.target.value}))} rows={3}
                style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:9, padding:"10px 12px", fontSize:14, resize:"vertical" }} />
            </div>

            <button className="submit-btn" onClick={handleSubmit} style={{
              width:"100%", background:C.header, color:"white", border:"none",
              borderRadius:11, padding:"14px", fontWeight:700, fontSize:15,
              cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"background 0.15s",
            }}>
              {editId ? "Save Changes" : "Add to Passport"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
