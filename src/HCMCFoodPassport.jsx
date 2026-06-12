import { useState, useEffect } from "react";

// ── CUISINE COLORS ────────────────────────────────────────────────────────────
const CUISINE_BG = {
  "Japanese 🇯🇵": "#e8f0f8",
  "Korean 🇰🇷": "#fff0e0",
  "Thai 🇹🇭": "#f5e8f8",
  "Chinese / HongKong 🇨🇳🇭🇰": "#fff5e8",
  "Taiwanese / Hotpot 🇹🇼": "#fce8f4",
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
  "Vietnamese Street/Local 🇻🇳": "#d4f5e4",
  "Cafe / Brunch ☕": "#f8f3e0",
  "Bakery 🥐": "#fff0d0",
};
const CUISINES = Object.keys(CUISINE_BG);

// ── EMPTY FORM ────────────────────────────────────────────────────────────────
function emptyForm() {
  return { place:"", area:"", cuisine:CUISINES[0], mustTry:"", budget:"", budgetTier:"Mid-range", vibe:"", status:"want", rating:0, tier:"", notes:"", mapsUrl:"", googleRating:"", googleReviewCount:"" };
}

// ── ALL 168 RESTAURANTS ──────────────────────────────────────────────────
const INITIAL_DATA = [
  {id:1,cuisine:"Vietnamese 🇻🇳",place:"Anan Saigon",area:"Q1",budget:"800k-1,000k",budgetTier:"Budget",mustTry:"Bánh mì / tasting snacks",vibe:"Fine dining",mapsUrl:"https://maps.google.com/?q=Anan+Saigon+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:2,cuisine:"Vietnamese 🇻🇳",place:"Quán Bụi Original",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Cơm nhà set",vibe:"Vietnamese comfort",mapsUrl:"https://maps.google.com/?q=Qu%C3%A1n+B%E1%BB%A5i+Original+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:3,cuisine:"Vietnamese 🇻🇳",place:"Secret Garden",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Gỏi cuốn / cơm nhà",vibe:"Rooftop",mapsUrl:"https://maps.google.com/?q=Secret+Garden+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:4,cuisine:"Vietnamese 🇻🇳",place:"Hoa Túc",area:"Q1",budget:"400k-900k",budgetTier:"Budget",mustTry:"Vietnamese set",vibe:"Date night",mapsUrl:"https://maps.google.com/?q=Hoa+T%C3%BAc+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:5,cuisine:"Vietnamese 🇻🇳",place:"Cục Gạch Quán",area:"Q1",budget:"350k-900k",budgetTier:"Premium under 1m",mustTry:"Cơm gia đình",vibe:"Classic",mapsUrl:"https://maps.google.com/?q=C%E1%BB%A5c+G%E1%BA%A1ch+Qu%C3%A1n+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:6,cuisine:"Vietnamese 🇻🇳",place:"Bếp Mẹ Ỉn",area:"Q1",budget:"250k-500k",budgetTier:"Mid-range",mustTry:"Bánh xèo / grilled pork",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=B%E1%BA%BFp+M%E1%BA%B9+%E1%BB%88n+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:7,cuisine:"Vietnamese 🇻🇳",place:"Hum Vegetarian",area:"Q2/Q3",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Mushroom hotpot",vibe:"Vegetarian",mapsUrl:"https://maps.google.com/?q=Hum+Vegetarian+Q2%2FQ3+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:8,cuisine:"Vietnamese 🇻🇳",place:"Chay Garden",area:"Q3",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Vegetarian set",vibe:"Vegetarian",mapsUrl:"https://maps.google.com/?q=Chay+Garden+Q3+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:9,cuisine:"Vietnamese 🇻🇳",place:"Mặn Mòi",area:"Q1/Q3",budget:"250k-700k",budgetTier:"Mid-range",mustTry:"Vietnamese seafood",vibe:"Modern VN",mapsUrl:"https://maps.google.com/?q=M%E1%BA%B7n+M%C3%B2i+Q1%2FQ3+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:10,cuisine:"Vietnamese 🇻🇳",place:"Nén Light Saigon",area:"Q1",budget:"700k-1,000k",budgetTier:"Budget",mustTry:"Modern tasting bites",vibe:"Fine casual",mapsUrl:"https://maps.google.com/?q=N%C3%A9n+Light+Saigon+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:11,cuisine:"Vietnamese 🇻🇳",place:"Mountain Retreat",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Cơm gia đình",vibe:"Rooftop",mapsUrl:"https://maps.google.com/?q=Mountain+Retreat+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:12,cuisine:"Vietnamese 🇻🇳",place:"Rice Field",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Vietnamese sharing dishes",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Rice+Field+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:13,cuisine:"Japanese 🇯🇵",place:"Ippudo Ramen",area:"Q1",budget:"250k-500k",budgetTier:"Mid-range",mustTry:"Shiromaru ramen",vibe:"Ramen",mapsUrl:"https://maps.google.com/?q=Ippudo+Ramen+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:14,cuisine:"Japanese 🇯🇵",place:"Futaba Ramen",area:"Q1",budget:"200k-400k",budgetTier:"Mid-range",mustTry:"Tonkotsu ramen",vibe:"Ramen",mapsUrl:"https://maps.google.com/?q=Futaba+Ramen+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:15,cuisine:"Japanese 🇯🇵",place:"Danbo Ramen",area:"Q1",budget:"200k-400k",budgetTier:"Mid-range",mustTry:"Classic ramen",vibe:"Ramen",mapsUrl:"https://maps.google.com/?q=Danbo+Ramen+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:16,cuisine:"Japanese 🇯🇵",place:"Mutahiro Ramen",area:"Q1",budget:"200k-450k",budgetTier:"Mid-range",mustTry:"Tsukemen / ramen",vibe:"Ramen",mapsUrl:"https://maps.google.com/?q=Mutahiro+Ramen+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:17,cuisine:"Japanese 🇯🇵",place:"Sushi Hokkaido Sachi",area:"Q1/Q3/Q7",budget:"400k-900k",budgetTier:"Budget",mustTry:"Aburi sushi",vibe:"Sushi",mapsUrl:"https://maps.google.com/?q=Sushi+Hokkaido+Sachi+Q1%2FQ3%2FQ7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:18,cuisine:"Japanese 🇯🇵",place:"Nori Modern Izakaya",area:"Q1",budget:"350k-900k",budgetTier:"Premium under 1m",mustTry:"Izakaya sharing plates",vibe:"Izakaya",mapsUrl:"https://maps.google.com/?q=Nori+Modern+Izakaya+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:19,cuisine:"Japanese 🇯🇵",place:"Izakaya Ten",area:"Q1/Phu Nhuan",budget:"300k-800k",budgetTier:"Mid-range",mustTry:"Yakitori / sake snacks",vibe:"Izakaya",mapsUrl:"https://maps.google.com/?q=Izakaya+Ten+Q1%2FPhu+Nhuan+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:20,cuisine:"Japanese 🇯🇵",place:"Izakaya Matsuki",area:"Q1",budget:"300k-800k",budgetTier:"Mid-range",mustTry:"Grilled skewers",vibe:"Izakaya",mapsUrl:"https://maps.google.com/?q=Izakaya+Matsuki+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:21,cuisine:"Japanese 🇯🇵",place:"Metetsu Izakaya",area:"Q1",budget:"300k-800k",budgetTier:"Mid-range",mustTry:"Nagoya chicken wings",vibe:"Izakaya",mapsUrl:"https://maps.google.com/?q=Metetsu+Izakaya+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:22,cuisine:"Japanese 🇯🇵",place:"Mangetsu",area:"Q1",budget:"350k-900k",budgetTier:"Premium under 1m",mustTry:"Okonomiyaki / sashimi",vibe:"Izakaya",mapsUrl:"https://maps.google.com/?q=Mangetsu+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:23,cuisine:"Japanese 🇯🇵",place:"Ebisu Shoten",area:"Q1",budget:"300k-800k",budgetTier:"Mid-range",mustTry:"Tempura / kushi katsu",vibe:"Izakaya",mapsUrl:"https://maps.google.com/?q=Ebisu+Shoten+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:24,cuisine:"Japanese 🇯🇵",place:"Fujiro Tonkatsu",area:"Q1",budget:"250k-500k",budgetTier:"Mid-range",mustTry:"Tonkatsu set",vibe:"Tonkatsu",mapsUrl:"https://maps.google.com/?q=Fujiro+Tonkatsu+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:25,cuisine:"Japanese 🇯🇵",place:"Chikara Gyoza",area:"Q1",budget:"200k-450k",budgetTier:"Mid-range",mustTry:"Gyoza / ramen",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Chikara+Gyoza+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:26,cuisine:"Japanese 🇯🇵",place:"Sukiya",area:"Multiple",budget:"120k-250k",budgetTier:"Budget",mustTry:"Gyudon",vibe:"Budget",mapsUrl:"https://maps.google.com/?q=Sukiya+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:27,cuisine:"Japanese 🇯🇵",place:"Maguro Studio",area:"Q1",budget:"400k-900k",budgetTier:"Budget",mustTry:"Tuna dishes",vibe:"Sushi",mapsUrl:"https://maps.google.com/?q=Maguro+Studio+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:28,cuisine:"Japanese 🇯🇵",place:"Tokyo Deli",area:"Multiple",budget:"150k-350k",budgetTier:"Budget",mustTry:"Sushi set",vibe:"Budget",mapsUrl:"https://maps.google.com/?q=Tokyo+Deli+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:29,cuisine:"Korean 🇰🇷",place:"Palsaik BBQ",area:"Q1",budget:"400k-900k",budgetTier:"Budget",mustTry:"8 flavour pork BBQ",vibe:"BBQ",mapsUrl:"https://maps.google.com/?q=Palsaik+BBQ+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:30,cuisine:"Korean 🇰🇷",place:"Midam Korean Premium BBQ",area:"Q1",budget:"450k-900k",budgetTier:"Premium under 1m",mustTry:"Beef BBQ set",vibe:"BBQ",mapsUrl:"https://maps.google.com/?q=Midam+Korean+Premium+BBQ+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:31,cuisine:"Korean 🇰🇷",place:"Bros Korea 1980s",area:"Q3",budget:"300k-800k",budgetTier:"Mid-range",mustTry:"Korean BBQ",vibe:"BBQ",mapsUrl:"https://maps.google.com/?q=Bros+Korea+1980s+Q3+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:32,cuisine:"Korean 🇰🇷",place:"Matchandeul BBQ",area:"Q7",budget:"400k-900k",budgetTier:"Budget",mustTry:"Pork belly BBQ",vibe:"BBQ",mapsUrl:"https://maps.google.com/?q=Matchandeul+BBQ+Q7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:33,cuisine:"Korean 🇰🇷",place:"Bornga",area:"Q1/Q7",budget:"400k-900k",budgetTier:"Budget",mustTry:"Woo Samgyeop",vibe:"BBQ",mapsUrl:"https://maps.google.com/?q=Bornga+Q1%2FQ7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:34,cuisine:"Korean 🇰🇷",place:"Hanuri",area:"Multiple",budget:"120k-300k",budgetTier:"Budget",mustTry:"Kimchi fried rice",vibe:"Budget",mapsUrl:"https://maps.google.com/?q=Hanuri+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:35,cuisine:"Korean 🇰🇷",place:"Don Chicken",area:"Multiple",budget:"200k-450k",budgetTier:"Mid-range",mustTry:"Fried chicken",vibe:"Chicken",mapsUrl:"https://maps.google.com/?q=Don+Chicken+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:36,cuisine:"Korean 🇰🇷",place:"Gaxeo Chicken",area:"Multiple",budget:"200k-450k",budgetTier:"Mid-range",mustTry:"Korean fried chicken",vibe:"Chicken",mapsUrl:"https://maps.google.com/?q=Gaxeo+Chicken+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:37,cuisine:"Korean 🇰🇷",place:"Doran Doran",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Korean home food",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Doran+Doran+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:38,cuisine:"Korean 🇰🇷",place:"Busan Korean Food",area:"Q1/Q7",budget:"150k-350k",budgetTier:"Budget",mustTry:"Tteokbokki / kimbap",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Busan+Korean+Food+Q1%2FQ7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:39,cuisine:"Korean 🇰🇷",place:"Yukssam BBQ",area:"Multiple",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"BBQ set",vibe:"BBQ",mapsUrl:"https://maps.google.com/?q=Yukssam+BBQ+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:40,cuisine:"Korean 🇰🇷",place:"Kimbap FC",area:"Multiple",budget:"120k-300k",budgetTier:"Budget",mustTry:"Kimbap / tteokbokki",vibe:"Budget",mapsUrl:"https://maps.google.com/?q=Kimbap+FC+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:41,cuisine:"Korean 🇰🇷",place:"Oppa Kitchen",area:"Multiple",budget:"150k-350k",budgetTier:"Budget",mustTry:"Bibimbap",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Oppa+Kitchen+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:42,cuisine:"Korean 🇰🇷",place:"Mabu-KKO Chi",area:"Q7",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Korean pub food",vibe:"Pocha",mapsUrl:"https://maps.google.com/?q=Mabu-KKO+Chi+Q7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:43,cuisine:"Thai 🇹🇭",place:"Som Tum Thai",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Papaya salad",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Som+Tum+Thai+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:44,cuisine:"Thai 🇹🇭",place:"Somtam ZAAP",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Som tam / grilled pork",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Somtam+ZAAP+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:45,cuisine:"Thai 🇹🇭",place:"Koh Yam Thai Kitchen",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Pad Thai / tom yum",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Koh+Yam+Thai+Kitchen+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:46,cuisine:"Thai 🇹🇭",place:"Lac Thai",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Tom yum seafood",vibe:"Classic",mapsUrl:"https://maps.google.com/?q=Lac+Thai+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:47,cuisine:"Thai 🇹🇭",place:"Golden Elephant",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Green curry",vibe:"Classic",mapsUrl:"https://maps.google.com/?q=Golden+Elephant+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:48,cuisine:"Thai 🇹🇭",place:"Mama Thai",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Pad Thai",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Mama+Thai+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:49,cuisine:"Thai 🇹🇭",place:"TukTuk Thai Bistro",area:"Multiple",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Thai sharing dishes",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=TukTuk+Thai+Bistro+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:50,cuisine:"Thai 🇹🇭",place:"Thai Market",area:"Multiple",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Thai street food",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Thai+Market+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:51,cuisine:"Thai 🇹🇭",place:"MK Restaurant",area:"Multiple",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Thai hotpot",vibe:"Hotpot",mapsUrl:"https://maps.google.com/?q=MK+Restaurant+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:52,cuisine:"Thai 🇹🇭",place:"Con Voi Vàng",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Thai curry",vibe:"Classic",mapsUrl:"https://maps.google.com/?q=Con+Voi+V%C3%A0ng+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:53,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Dim Tu Tac",area:"Q1/Q5/Q7",budget:"350k-900k",budgetTier:"Premium under 1m",mustTry:"Har gow / dimsum",vibe:"Dimsum",mapsUrl:"https://maps.google.com/?q=Dim+Tu+Tac+Q1%2FQ5%2FQ7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:54,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Baoz Dimsum",area:"Q5/Q7",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Xiao long bao",vibe:"Dimsum",mapsUrl:"https://maps.google.com/?q=Baoz+Dimsum+Q5%2FQ7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:55,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"San Fu Lou",area:"Q1/Q7",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Dimsum / roasted duck",vibe:"Cantonese",mapsUrl:"https://maps.google.com/?q=San+Fu+Lou+Q1%2FQ7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:56,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Crystal Jade",area:"Q1",budget:"400k-900k",budgetTier:"Budget",mustTry:"Cantonese dishes",vibe:"Cantonese",mapsUrl:"https://maps.google.com/?q=Crystal+Jade+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:57,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Tim Ho Wan",area:"Q1",budget:"350k-800k",budgetTier:"Mid-range",mustTry:"BBQ pork buns",vibe:"Dimsum",mapsUrl:"https://maps.google.com/?q=Tim+Ho+Wan+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:58,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Tân Hải Vân",area:"Q1/Q5",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Mì vịt tiềm",vibe:"Chinatown",mapsUrl:"https://maps.google.com/?q=T%C3%A2n+H%E1%BA%A3i+V%C3%A2n+Q1%2FQ5+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:59,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Hải Ký Mì Gia",area:"Q5",budget:"150k-350k",budgetTier:"Budget",mustTry:"Mì hoành thánh",vibe:"Chinatown",mapsUrl:"https://maps.google.com/?q=H%E1%BA%A3i+K%C3%BD+M%C3%AC+Gia+Q5+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:60,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Mỹ Vị Hong Kong",area:"Q5",budget:"150k-400k",budgetTier:"Budget",mustTry:"Hong Kong noodles",vibe:"Chinatown",mapsUrl:"https://maps.google.com/?q=M%E1%BB%B9+V%E1%BB%8B+Hong+Kong+Q5+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:61,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Long Triều",area:"Q3",budget:"400k-900k",budgetTier:"Budget",mustTry:"Cantonese dishes",vibe:"Cantonese",mapsUrl:"https://maps.google.com/?q=Long+Tri%E1%BB%81u+Q3+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:62,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Bao Bei",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Chinese comfort food",vibe:"Modern",mapsUrl:"https://maps.google.com/?q=Bao+Bei+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:63,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Cửu Long Quán Kowloon",area:"Q6",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Hong Kong street food",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=C%E1%BB%ADu+Long+Qu%C3%A1n+Kowloon+Q6+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:64,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Dimsum Ông Sủi",area:"Q5",budget:"150k-350k",budgetTier:"Budget",mustTry:"Dimsum plates",vibe:"Budget",mapsUrl:"https://maps.google.com/?q=Dimsum+%C3%94ng+S%E1%BB%A7i+Q5+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:65,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Sủi Cảo Ngọc Ý",area:"Q11",budget:"100k-250k",budgetTier:"Budget",mustTry:"Sủi cảo",vibe:"Budget",mapsUrl:"https://maps.google.com/?q=S%E1%BB%A7i+C%E1%BA%A3o+Ng%E1%BB%8Dc+%C3%9D+Q11+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:66,cuisine:"Chinese / HongKong 🇨🇳🇭🇰",place:"Tân Tòng Lợi",area:"Q3",budget:"100k-250k",budgetTier:"Budget",mustTry:"Sủi cảo / mì",vibe:"Budget",mapsUrl:"https://maps.google.com/?q=T%C3%A2n+T%C3%B2ng+L%E1%BB%A3i+Q3+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:67,cuisine:"Italian 🇮🇹",place:"Pizza 4P's",area:"Multiple",budget:"350k-800k",budgetTier:"Mid-range",mustTry:"Burrata pizza",vibe:"Pizza",mapsUrl:"https://maps.google.com/?q=Pizza+4P%27s+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:68,cuisine:"Italian 🇮🇹",place:"Pendolasco",area:"Q1/Q2",budget:"400k-900k",budgetTier:"Budget",mustTry:"Wood-fired pizza",vibe:"Italian",mapsUrl:"https://maps.google.com/?q=Pendolasco+Q1%2FQ2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:69,cuisine:"Italian 🇮🇹",place:"Ciao Bella",area:"Q1",budget:"400k-900k",budgetTier:"Budget",mustTry:"Pasta / risotto",vibe:"Italian",mapsUrl:"https://maps.google.com/?q=Ciao+Bella+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:70,cuisine:"Italian 🇮🇹",place:"Basta Hiro",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Pizza / pasta",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Basta+Hiro+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:71,cuisine:"Italian 🇮🇹",place:"Truffle & Co.",area:"Q1",budget:"350k-800k",budgetTier:"Mid-range",mustTry:"Truffle pasta",vibe:"Pasta",mapsUrl:"https://maps.google.com/?q=Truffle+%26+Co.+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:72,cuisine:"Italian 🇮🇹",place:"Pasta Club",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Fresh pasta",vibe:"Pasta",mapsUrl:"https://maps.google.com/?q=Pasta+Club+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:73,cuisine:"Italian 🇮🇹",place:"Opera Italian Restaurant",area:"Q1",budget:"500k-1,000k",budgetTier:"Budget",mustTry:"Pasta / Italian mains",vibe:"Italian",mapsUrl:"https://maps.google.com/?q=Opera+Italian+Restaurant+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:74,cuisine:"Italian 🇮🇹",place:"Pizza Reale",area:"Q2",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Neapolitan pizza",vibe:"Pizza",mapsUrl:"https://maps.google.com/?q=Pizza+Reale+Q2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:75,cuisine:"Italian 🇮🇹",place:"Lucca",area:"Q1",budget:"400k-900k",budgetTier:"Budget",mustTry:"Italian classics",vibe:"Italian",mapsUrl:"https://maps.google.com/?q=Lucca+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:76,cuisine:"Italian 🇮🇹",place:"Da Vittorio Saigon",area:"Q1",budget:"700k-1,000k",budgetTier:"Budget",mustTry:"Italian set dishes",vibe:"Premium",mapsUrl:"https://maps.google.com/?q=Da+Vittorio+Saigon+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:77,cuisine:"French 🇫🇷",place:"Cocotte",area:"Q1",budget:"300k-800k",budgetTier:"Mid-range",mustTry:"Duck confit",vibe:"Bistro",mapsUrl:"https://maps.google.com/?q=Cocotte+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:78,cuisine:"French 🇫🇷",place:"Marcel Gourmet Burger",area:"Q1/Q2",budget:"250k-500k",budgetTier:"Mid-range",mustTry:"Burger",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=Marcel+Gourmet+Burger+Q1%2FQ2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:79,cuisine:"French 🇫🇷",place:"L'Usine",area:"Q1/Q2",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Brunch / bistro",vibe:"Cafe bistro",mapsUrl:"https://maps.google.com/?q=L%27Usine+Q1%2FQ2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:80,cuisine:"French 🇫🇷",place:"Paul Bakery",area:"Q1",budget:"150k-400k",budgetTier:"Budget",mustTry:"Pastry / croissant",vibe:"Bakery",mapsUrl:"https://maps.google.com/?q=Paul+Bakery+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:81,cuisine:"French 🇫🇷",place:"Le Padam",area:"Q1",budget:"350k-900k",budgetTier:"Premium under 1m",mustTry:"Wine bistro plates",vibe:"Bistro",mapsUrl:"https://maps.google.com/?q=Le+Padam+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:82,cuisine:"French 🇫🇷",place:"The Refinery",area:"Q1",budget:"350k-900k",budgetTier:"Premium under 1m",mustTry:"French bistro",vibe:"Bistro",mapsUrl:"https://maps.google.com/?q=The+Refinery+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:83,cuisine:"French 🇫🇷",place:"Au Parc",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Mediterranean brunch",vibe:"Brunch",mapsUrl:"https://maps.google.com/?q=Au+Parc+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:84,cuisine:"French 🇫🇷",place:"Godmother Bake & Brunch",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Brunch",vibe:"Brunch",mapsUrl:"https://maps.google.com/?q=Godmother+Bake+%26+Brunch+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:85,cuisine:"Spanish 🇪🇸",place:"Tomatito Saigon",area:"Q1",budget:"350k-900k",budgetTier:"Premium under 1m",mustTry:"Tapas / paella",vibe:"Tapas",mapsUrl:"https://maps.google.com/?q=Tomatito+Saigon+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:86,cuisine:"Spanish 🇪🇸",place:"Iberico Tapas y Vino",area:"Q1/Q2",budget:"400k-900k",budgetTier:"Budget",mustTry:"Iberico tapas",vibe:"Tapas",mapsUrl:"https://maps.google.com/?q=Iberico+Tapas+y+Vino+Q1%2FQ2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:87,cuisine:"Spanish 🇪🇸",place:"Octo Tapas Restobar",area:"Q1",budget:"400k-900k",budgetTier:"Budget",mustTry:"Octopus / tapas",vibe:"Tapas",mapsUrl:"https://maps.google.com/?q=Octo+Tapas+Restobar+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:88,cuisine:"Spanish 🇪🇸",place:"La Fiesta",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Tex-Mex / tacos",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=La+Fiesta+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:89,cuisine:"Spanish 🇪🇸",place:"Ole Spanish Restaurant",area:"Q1",budget:"350k-800k",budgetTier:"Mid-range",mustTry:"Paella",vibe:"Spanish",mapsUrl:"https://maps.google.com/?q=Ole+Spanish+Restaurant+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:90,cuisine:"Spanish 🇪🇸",place:"El Camino Taqueria",area:"Q2",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Tacos / tapas",vibe:"Casual",mapsUrl:"https://maps.google.com/?q=El+Camino+Taqueria+Q2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:91,cuisine:"Mexican 🇲🇽",place:"District Federal",area:"Thao Dien",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Tacos al pastor",vibe:"Mexican",mapsUrl:"https://maps.google.com/?q=District+Federal+Thao+Dien+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:92,cuisine:"Mexican 🇲🇽",place:"Tippy's Mexican Food",area:"Thao Dien",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Burrito / tacos",vibe:"Mexican",mapsUrl:"https://maps.google.com/?q=Tippy%27s+Mexican+Food+Thao+Dien+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:93,cuisine:"Mexican 🇲🇽",place:"Rico Taco",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Tacos",vibe:"Mexican",mapsUrl:"https://maps.google.com/?q=Rico+Taco+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:94,cuisine:"Mexican 🇲🇽",place:"Gringo Tacos",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Tacos",vibe:"Mexican",mapsUrl:"https://maps.google.com/?q=Gringo+Tacos+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:95,cuisine:"Mexican 🇲🇽",place:"TacoLeo",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Tacos",vibe:"Mexican",mapsUrl:"https://maps.google.com/?q=TacoLeo+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:96,cuisine:"Mexican 🇲🇽",place:"Mexcla",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Tacos / quesadilla",vibe:"Mexican",mapsUrl:"https://maps.google.com/?q=Mexcla+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:97,cuisine:"Mexican 🇲🇽",place:"Bandido Saigon",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Modern Mexican",vibe:"Mexican",mapsUrl:"https://maps.google.com/?q=Bandido+Saigon+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:98,cuisine:"Mexican 🇲🇽",place:"Sol Kitchen & Bar",area:"Q7",budget:"400k-900k",budgetTier:"Budget",mustTry:"Latin sharing plates",vibe:"Latin",mapsUrl:"https://maps.google.com/?q=Sol+Kitchen+%26+Bar+Q7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:99,cuisine:"Indian 🇮🇳",place:"Baba's Kitchen",area:"Q1/Q2",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Butter chicken",vibe:"Indian",mapsUrl:"https://maps.google.com/?q=Baba%27s+Kitchen+Q1%2FQ2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:100,cuisine:"Indian 🇮🇳",place:"Tandoor",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Tandoori chicken",vibe:"Indian",mapsUrl:"https://maps.google.com/?q=Tandoor+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:101,cuisine:"Indian 🇮🇳",place:"Benaras",area:"Q1",budget:"400k-900k",budgetTier:"Budget",mustTry:"North Indian curry",vibe:"Indian",mapsUrl:"https://maps.google.com/?q=Benaras+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:102,cuisine:"Indian 🇮🇳",place:"Ganesh",area:"Q1/Q2",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Naan / curry",vibe:"Indian",mapsUrl:"https://maps.google.com/?q=Ganesh+Q1%2FQ2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:103,cuisine:"Indian 🇮🇳",place:"Mustard Indian Restaurant",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Biryani",vibe:"Indian",mapsUrl:"https://maps.google.com/?q=Mustard+Indian+Restaurant+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:104,cuisine:"Indian 🇮🇳",place:"Saffron Indian",area:"Q1",budget:"300k-800k",budgetTier:"Mid-range",mustTry:"Indian set",vibe:"Indian",mapsUrl:"https://maps.google.com/?q=Saffron+Indian+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:105,cuisine:"Indian 🇮🇳",place:"Namaste India",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Curry / naan",vibe:"Indian",mapsUrl:"https://maps.google.com/?q=Namaste+India+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:106,cuisine:"Indian 🇮🇳",place:"Dahi Handi",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Indian thali",vibe:"Indian",mapsUrl:"https://maps.google.com/?q=Dahi+Handi+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:107,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Pasha Turkish Restaurant",area:"Thao Dien",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Mixed kebab",vibe:"Turkish",mapsUrl:"https://maps.google.com/?q=Pasha+Turkish+Restaurant+Thao+Dien+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:108,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Kebaby",area:"Thao Dien",budget:"150k-350k",budgetTier:"Budget",mustTry:"Kebab wrap",vibe:"Turkish",mapsUrl:"https://maps.google.com/?q=Kebaby+Thao+Dien+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:109,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Al Sham Saigon",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Shawarma / grill",vibe:"Syrian",mapsUrl:"https://maps.google.com/?q=Al+Sham+Saigon+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:110,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Beirut Restaurant",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"Mezze platter",vibe:"Lebanese",mapsUrl:"https://maps.google.com/?q=Beirut+Restaurant+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:111,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Hummus & Grill",area:"Thao Dien",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Hummus / kebab",vibe:"Middle Eastern",mapsUrl:"https://maps.google.com/?q=Hummus+%26+Grill+Thao+Dien+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:112,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Sultan Kebab",area:"Q1",budget:"150k-350k",budgetTier:"Budget",mustTry:"Kebab",vibe:"Turkish",mapsUrl:"https://maps.google.com/?q=Sultan+Kebab+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:113,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Tandoor Halal Saigon",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Halal grill",vibe:"Halal",mapsUrl:"https://maps.google.com/?q=Tandoor+Halal+Saigon+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:114,cuisine:"Middle Eastern 🇱🇧🇹🇷",place:"Mr. Kebab",area:"Multiple",budget:"120k-300k",budgetTier:"Budget",mustTry:"Kebab wrap",vibe:"Budget",mapsUrl:"https://maps.google.com/?q=Mr.+Kebab+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:115,cuisine:"American 🇺🇸",place:"Eddie's Diner",area:"Q1/Q2",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Burger / milkshake",vibe:"Diner",mapsUrl:"https://maps.google.com/?q=Eddie%27s+Diner+Q1%2FQ2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:116,cuisine:"American 🇺🇸",place:"Quan Ut Ut",area:"Q1/Q2",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"BBQ ribs",vibe:"BBQ",mapsUrl:"https://maps.google.com/?q=Quan+Ut+Ut+Q1%2FQ2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:117,cuisine:"American 🇺🇸",place:"Jake's BBQ",area:"Q1",budget:"350k-800k",budgetTier:"Mid-range",mustTry:"Smoked ribs",vibe:"BBQ",mapsUrl:"https://maps.google.com/?q=Jake%27s+BBQ+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:118,cuisine:"American 🇺🇸",place:"Soul Burger",area:"Q2",budget:"250k-500k",budgetTier:"Mid-range",mustTry:"Burger",vibe:"Burger",mapsUrl:"https://maps.google.com/?q=Soul+Burger+Q2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:119,cuisine:"American 🇺🇸",place:"Chuck's Burgers",area:"Q1",budget:"250k-500k",budgetTier:"Mid-range",mustTry:"Burger",vibe:"Burger",mapsUrl:"https://maps.google.com/?q=Chuck%27s+Burgers+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:120,cuisine:"American 🇺🇸",place:"BiaCraft",area:"Q2/Q3",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Wings / burgers",vibe:"Pub",mapsUrl:"https://maps.google.com/?q=BiaCraft+Q2%2FQ3+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:121,cuisine:"American 🇺🇸",place:"7 Bridges Brewing",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Brewpub food",vibe:"Pub",mapsUrl:"https://maps.google.com/?q=7+Bridges+Brewing+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:122,cuisine:"American 🇺🇸",place:"Hard Rock Cafe",area:"Q1",budget:"400k-900k",budgetTier:"Budget",mustTry:"Burger / ribs",vibe:"American",mapsUrl:"https://maps.google.com/?q=Hard+Rock+Cafe+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:123,cuisine:"American 🇺🇸",place:"Chicago Steakhouse",area:"Q1",budget:"600k-1,000k",budgetTier:"Premium under 1m",mustTry:"Steak lunch/set",vibe:"Steak",mapsUrl:"https://maps.google.com/?q=Chicago+Steakhouse+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:124,cuisine:"American 🇺🇸",place:"The Wagon Wheel",area:"Q1",budget:"300k-700k",budgetTier:"Mid-range",mustTry:"American comfort food",vibe:"Diner",mapsUrl:"https://maps.google.com/?q=The+Wagon+Wheel+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:125,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Mamak Malaysian",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Nasi lemak",vibe:"Malaysian",mapsUrl:"https://maps.google.com/?q=Mamak+Malaysian+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:126,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Penang Food Village",area:"Q1",budget:"150k-400k",budgetTier:"Budget",mustTry:"Char kway teow",vibe:"Malaysian",mapsUrl:"https://maps.google.com/?q=Penang+Food+Village+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:127,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Song Fa Bak Kut Teh",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Bak kut teh",vibe:"Singaporean",mapsUrl:"https://maps.google.com/?q=Song+Fa+Bak+Kut+Teh+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:128,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Old Street Bak Kut Teh",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Bak kut teh",vibe:"Singaporean",mapsUrl:"https://maps.google.com/?q=Old+Street+Bak+Kut+Teh+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:129,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Lion City Cafe & Restaurant",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Singapore chicken rice",vibe:"Singaporean",mapsUrl:"https://maps.google.com/?q=Lion+City+Cafe+%26+Restaurant+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:130,cuisine:"Malaysia / Singapore 🇲🇾🇸🇬",place:"Hawker Star",area:"Multiple",budget:"150k-350k",budgetTier:"Budget",mustTry:"Hainanese chicken rice",vibe:"Singaporean",mapsUrl:"https://maps.google.com/?q=Hawker+Star+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:131,cuisine:"Indonesia 🇮🇩",place:"Warung Indo",area:"Q1",budget:"150k-400k",budgetTier:"Budget",mustTry:"Nasi goreng",vibe:"Indonesian",mapsUrl:"https://maps.google.com/?q=Warung+Indo+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:132,cuisine:"Indonesia 🇮🇩",place:"Dapur Indo",area:"Q1",budget:"150k-400k",budgetTier:"Budget",mustTry:"Rendang",vibe:"Indonesian",mapsUrl:"https://maps.google.com/?q=Dapur+Indo+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:133,cuisine:"Indonesia 🇮🇩",place:"Bali in Saigon",area:"Q2",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Balinese dishes",vibe:"Indonesian",mapsUrl:"https://maps.google.com/?q=Bali+in+Saigon+Q2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:134,cuisine:"Indonesia 🇮🇩",place:"Sate House",area:"Q1",budget:"150k-400k",budgetTier:"Budget",mustTry:"Satay",vibe:"Indonesian",mapsUrl:"https://maps.google.com/?q=Sate+House+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:135,cuisine:"Taiwanese / Hotpot 🇹🇼",place:"Din Tai Fung",area:"Q1",budget:"350k-800k",budgetTier:"Mid-range",mustTry:"Xiao long bao",vibe:"Taiwanese",mapsUrl:"https://maps.google.com/?q=Din+Tai+Fung+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:136,cuisine:"Taiwanese / Hotpot 🇹🇼",place:"Manwah Taiwanese Hotpot",area:"Multiple",budget:"400k-800k",budgetTier:"Budget",mustTry:"Hotpot buffet",vibe:"Hotpot",mapsUrl:"https://maps.google.com/?q=Manwah+Taiwanese+Hotpot+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:137,cuisine:"Taiwanese / Hotpot 🇹🇼",place:"Haidilao Hotpot",area:"Multiple",budget:"500k-1,000k",budgetTier:"Budget",mustTry:"Hotpot",vibe:"Hotpot",mapsUrl:"https://maps.google.com/?q=Haidilao+Hotpot+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:138,cuisine:"Taiwanese / Hotpot 🇹🇼",place:"Beauty in the Pot",area:"Q1",budget:"500k-1,000k",budgetTier:"Budget",mustTry:"Collagen hotpot",vibe:"Hotpot",mapsUrl:"https://maps.google.com/?q=Beauty+in+the+Pot+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:139,cuisine:"Taiwanese / Hotpot 🇹🇼",place:"Kichi-Kichi",area:"Multiple",budget:"250k-500k",budgetTier:"Mid-range",mustTry:"Conveyor hotpot",vibe:"Hotpot",mapsUrl:"https://maps.google.com/?q=Kichi-Kichi+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:140,cuisine:"Taiwanese / Hotpot 🇹🇼",place:"Lau Wang",area:"Multiple",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Hotpot",vibe:"Hotpot",mapsUrl:"https://maps.google.com/?q=Lau+Wang+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:141,cuisine:"Taiwanese / Hotpot 🇹🇼",place:"Mala Xiang Guo Sky Garden",area:"Q7",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Mala bowl",vibe:"Mala",mapsUrl:"https://maps.google.com/?q=Mala+Xiang+Guo+Sky+Garden+Q7+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:142,cuisine:"Taiwanese / Hotpot 🇹🇼",place:"Hutong",area:"Multiple",budget:"350k-700k",budgetTier:"Mid-range",mustTry:"Hong Kong hotpot",vibe:"Hotpot",mapsUrl:"https://maps.google.com/?q=Hutong+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:143,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Phở Gia Hân",area:"Bình Thạnh",budget:"80k-150k",budgetTier:"Budget",mustTry:"Phở bò",vibe:"Local",mapsUrl:"https://maps.google.com/?q=Ph%E1%BB%9F+Gia+H%C3%A2n+B%C3%ACnh+Th%E1%BA%A1nh+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:144,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Phở Miến Gà Kỳ Đồng",area:"Q3",budget:"80k-180k",budgetTier:"Budget",mustTry:"Miến gà",vibe:"Local",mapsUrl:"https://maps.google.com/?q=Ph%E1%BB%9F+Mi%E1%BA%BFn+G%C3%A0+K%E1%BB%B3+%C4%90%E1%BB%93ng+Q3+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:145,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Phở Chú Hải",area:"Q1",budget:"80k-180k",budgetTier:"Budget",mustTry:"Phở đêm",vibe:"Late night",mapsUrl:"https://maps.google.com/?q=Ph%E1%BB%9F+Ch%C3%BA+H%E1%BA%A3i+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:146,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Hủ Tiếu Thành Đạt",area:"Q1",budget:"80k-150k",budgetTier:"Budget",mustTry:"Hủ tiếu Nam Vang",vibe:"Local",mapsUrl:"https://maps.google.com/?q=H%E1%BB%A7+Ti%E1%BA%BFu+Th%C3%A0nh+%C4%90%E1%BA%A1t+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:147,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Hủ Tiếu Mì Gà Hà Ký",area:"Q1",budget:"80k-150k",budgetTier:"Budget",mustTry:"Hủ tiếu mì gà",vibe:"Local",mapsUrl:"https://maps.google.com/?q=H%E1%BB%A7+Ti%E1%BA%BFu+M%C3%AC+G%C3%A0+H%C3%A0+K%C3%BD+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:148,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Bún Bò Hoàng Sa",area:"Q3",budget:"70k-150k",budgetTier:"Budget",mustTry:"Bún bò Huế",vibe:"Local",mapsUrl:"https://maps.google.com/?q=B%C3%BAn+B%C3%B2+Ho%C3%A0ng+Sa+Q3+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:149,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Bún Chả Vân Anh",area:"Tân Bình",budget:"70k-150k",budgetTier:"Budget",mustTry:"Bún chả",vibe:"Local",mapsUrl:"https://maps.google.com/?q=B%C3%BAn+Ch%E1%BA%A3+V%C3%A2n+Anh+T%C3%A2n+B%C3%ACnh+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:150,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Bún Thịt Nướng Kiều Bảo",area:"Q1/Q10",budget:"70k-150k",budgetTier:"Budget",mustTry:"Bún thịt nướng",vibe:"Local",mapsUrl:"https://maps.google.com/?q=B%C3%BAn+Th%E1%BB%8Bt+N%C6%B0%E1%BB%9Bng+Ki%E1%BB%81u+B%E1%BA%A3o+Q1%2FQ10+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:151,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Cơm Tấm Huyền",area:"Bình Thạnh",budget:"80k-180k",budgetTier:"Budget",mustTry:"Cơm tấm đêm",vibe:"Late night",mapsUrl:"https://maps.google.com/?q=C%C6%A1m+T%E1%BA%A5m+Huy%E1%BB%81n+B%C3%ACnh+Th%E1%BA%A1nh+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:152,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Cơm Tấm Nạc Giòn",area:"Phú Nhuận",budget:"80k-180k",budgetTier:"Budget",mustTry:"Cơm tấm nạc giòn",vibe:"Local",mapsUrl:"https://maps.google.com/?q=C%C6%A1m+T%E1%BA%A5m+N%E1%BA%A1c+Gi%C3%B2n+Ph%C3%BA+Nhu%E1%BA%ADn+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:153,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Cơm Gà Thanh",area:"Q5",budget:"80k-180k",budgetTier:"Budget",mustTry:"Cơm gà",vibe:"Local",mapsUrl:"https://maps.google.com/?q=C%C6%A1m+G%C3%A0+Thanh+Q5+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:154,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Bánh Mì Bùi Thị Xuân",area:"Q1",budget:"40k-100k",budgetTier:"Budget",mustTry:"Bánh mì",vibe:"Local",mapsUrl:"https://maps.google.com/?q=B%C3%A1nh+M%C3%AC+B%C3%B9i+Th%E1%BB%8B+Xu%C3%A2n+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:155,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Bánh Mì Thanh Hằng",area:"Bình Thạnh",budget:"40k-100k",budgetTier:"Budget",mustTry:"Bánh mì",vibe:"Local",mapsUrl:"https://maps.google.com/?q=B%C3%A1nh+M%C3%AC+Thanh+H%E1%BA%B1ng+B%C3%ACnh+Th%E1%BA%A1nh+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:156,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Bò Lá Lốt Đường Ray",area:"Phú Nhuận",budget:"80k-180k",budgetTier:"Budget",mustTry:"Bò lá lốt",vibe:"Local",mapsUrl:"https://maps.google.com/?q=B%C3%B2+L%C3%A1+L%E1%BB%91t+%C4%90%C6%B0%E1%BB%9Dng+Ray+Ph%C3%BA+Nhu%E1%BA%ADn+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:157,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Ốc Trứng Muối Hoa Sữa",area:"Phú Nhuận",budget:"150k-400k",budgetTier:"Budget",mustTry:"Ốc trứng muối",vibe:"Seafood",mapsUrl:"https://maps.google.com/?q=%E1%BB%90c+Tr%E1%BB%A9ng+Mu%E1%BB%91i+Hoa+S%E1%BB%AFa+Ph%C3%BA+Nhu%E1%BA%ADn+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:158,cuisine:"Vietnamese Street/Local 🇻🇳",place:"Cá Viên Chiên Nguyễn Thái Học",area:"Q1",budget:"50k-150k",budgetTier:"Budget",mustTry:"Cá viên chiên",vibe:"Snack",mapsUrl:"https://maps.google.com/?q=C%C3%A1+Vi%C3%AAn+Chi%C3%AAn+Nguy%E1%BB%85n+Th%C3%A1i+H%E1%BB%8Dc+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:159,cuisine:"Cafe / Brunch ☕",place:"I Hate Monday",area:"Thao Dien",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Brunch",vibe:"Cafe",mapsUrl:"https://maps.google.com/?q=I+Hate+Monday+Thao+Dien+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:160,cuisine:"Cafe / Brunch ☕",place:"Today With You",area:"Thao Dien",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Korean cafe food",vibe:"Cafe",mapsUrl:"https://maps.google.com/?q=Today+With+You+Thao+Dien+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:161,cuisine:"Cafe / Brunch ☕",place:"Zumwhere",area:"Thao Dien",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Souffle pancake",vibe:"Cafe",mapsUrl:"https://maps.google.com/?q=Zumwhere+Thao+Dien+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:162,cuisine:"Cafe / Brunch ☕",place:"Oliu Quán",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Brunch / casual plates",vibe:"Cafe",mapsUrl:"https://maps.google.com/?q=Oliu+Qu%C3%A1n+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:163,cuisine:"Cafe / Brunch ☕",place:"15 Grams Homemade Kitchen",area:"Q1",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Brunch",vibe:"Cafe",mapsUrl:"https://maps.google.com/?q=15+Grams+Homemade+Kitchen+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:164,cuisine:"Cafe / Brunch ☕",place:"Godmother Bake & Brunch",area:"Q1",budget:"250k-600k",budgetTier:"Mid-range",mustTry:"Brunch",vibe:"Cafe",mapsUrl:"https://maps.google.com/?q=Godmother+Bake+%26+Brunch+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:165,cuisine:"Cafe / Brunch ☕",place:"L'Usine Cafe",area:"Q1/Q2",budget:"200k-500k",budgetTier:"Mid-range",mustTry:"Brunch / dessert",vibe:"Cafe",mapsUrl:"https://maps.google.com/?q=L%27Usine+Cafe+Q1%2FQ2+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:166,cuisine:"Cafe / Brunch ☕",place:"Maison Marou",area:"Q1",budget:"150k-400k",budgetTier:"Budget",mustTry:"Chocolate desserts",vibe:"Dessert",mapsUrl:"https://maps.google.com/?q=Maison+Marou+Q1+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:167,cuisine:"Cafe / Brunch ☕",place:"Tous Les Jours",area:"Multiple",budget:"80k-250k",budgetTier:"Budget",mustTry:"Bakery",vibe:"Bakery",mapsUrl:"https://maps.google.com/?q=Tous+Les+Jours+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""},
  {id:168,cuisine:"Cafe / Brunch ☕",place:"Runam Bistro",area:"Multiple",budget:"200k-600k",budgetTier:"Mid-range",mustTry:"Vietnamese cafe bistro",vibe:"Cafe",mapsUrl:"https://maps.google.com/?q=Runam+Bistro+Multiple+Ho+Chi+Minh+City",status:"want",rating:0,tier:"",notes:"",googleRating:"",googleReviewCount:""}
];

// ── DISTRICT HELPER ───────────────────────────────────────────────────────────
function getDistrict(area) {
  if (!area || area === "Multiple" || area === "TP.HCM" || area === "CMT8") return "Multiple / Other";
  if (area.includes("Thao Dien") || area.includes("Thảo Điền") || (area.includes("Q2") && !area.includes("Q1"))) return "Q2 / Thảo Điền";
  if (area.startsWith("Q1") || area.includes("Q1")) return "Quận 1";
  if (area.startsWith("Q3") || area.includes("Q3") || area.includes("Lê Văn Sỹ")) return "Quận 3";
  if (area.startsWith("Q5") || area.includes("Q5")) return "Quận 5";
  if (area.startsWith("Q6")) return "Quận 6";
  if (area.startsWith("Q7") || area.includes("Q7")) return "Quận 7";
  if (area.startsWith("Q10") || area.includes("Q10")) return "Quận 10";
  if (area.startsWith("Q11")) return "Quận 11";
  if (area.includes("Bình Thạnh")) return "Bình Thạnh";
  if (area.includes("Phú Nhuận")) return "Phú Nhuận";
  if (area.includes("Tân Bình")) return "Tân Bình";
  return "Multiple / Other";
}


const ALL_DISTRICTS = ["All Districts","Quận 1","Q2 / Thảo Điền","Quận 3","Quận 5","Quận 6","Quận 7","Quận 10","Quận 11","Bình Thạnh","Phú Nhuận","Tân Bình","Multiple / Other"];;

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const A  = "#C0442B"; // accent — HCMC terracotta
const BG = "#FBF9F4"; // warm off-white
const TK = "#1A1815"; // near-black
const B1 = "#E7E1D5"; // light border
const B2 = "#DAD2C4"; // medium border

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function HCMCFoodPassport({ onSwitch = () => {} }) {
  const [entries, setEntries]               = useState([]);
  const [loading, setLoading]               = useState(true);
  const [filter, setFilter]                 = useState("all");
  const [cuisineFilter, setCuisineFilter]   = useState("All Cuisines");
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [vibeFilter, setVibeFilter]         = useState("All Vibes");
  const [budgetTierFilter, setBudgetTierFilter] = useState("All Budgets");
  const [search, setSearch]                 = useState("");
  const [showForm, setShowForm]             = useState(false);
  const [editId, setEditId]                 = useState(null);
  const [form, setForm]                     = useState(emptyForm());
  const [photos, setPhotos]                 = useState({});
  const [showApiInput, setShowApiInput]     = useState(false);
  const [apiKeyDraft, setApiKeyDraft]       = useState("");
  const [importStatus, setImportStatus]     = useState(null);
  const [importProgress, setImportProgress] = useState({ done:0, total:0 });

  useEffect(() => {
    (() => {
      try {
        const res = localStorage.getItem("hcmc-passport-v1");
        if (res) {
          const parsed = JSON.parse(res);
          const migrated = parsed.map(e => ({
            googleRating:"", googleReviewCount:"", budgetTier:"", vibe:"", tier:"", ...e,
            mustTry: e.mustTry || e.type || "",
            cuisine: e.cuisine === "Chinese / HK 🇨🇳🇭🇰" ? "Chinese / HongKong 🇨🇳🇭🇰" : e.cuisine,
          }));
          setEntries(migrated.length ? migrated : INITIAL_DATA);
        } else {
          setEntries(INITIAL_DATA);
        }
      } catch { setEntries(INITIAL_DATA); }
      setLoading(false);
    })();
  }, []);

  function persist(next) {
    setEntries(next);
    try { localStorage.setItem("hcmc-passport-v1", JSON.stringify(next)); } catch {}
  }

  function cycleStatus(id) {
    persist(entries.map(e => {
      if (e.id !== id) return e;
      const next = e.status === "want" ? "tried" : e.status === "tried" ? "fav" : "want";
      return { ...e, status: next, rating: next === "want" ? 0 : e.rating };
    }));
  }

  function setRating(id, n) {
    persist(entries.map(e => e.id !== id ? e : {
      ...e,
      rating: e.rating === n ? 0 : n,
      status: e.status === "want" && n > 0 ? "tried" : e.status,
    }));
  }

  function handlePhoto(id, file) {
    if (!file) return;
    setPhotos(p => ({ ...p, [id]: URL.createObjectURL(file) }));
  }

  function handleSubmit() {
    if (!form.place.trim()) return;
    if (editId !== null) {
      persist(entries.map(e => e.id === editId ? { ...form, id: editId } : e));
    } else {
      persist([{ ...form, id: Date.now() }, ...entries]);
    }
    setEditId(null); setShowForm(false); setForm(emptyForm());
  }

  function startEdit(e) {
    setForm({ googleRating:"", googleReviewCount:"", mustTry:"", budgetTier:"", vibe:"", tier:"", ...e });
    setEditId(e.id); setShowForm(true);
  }
  function deleteEntry(id) { persist(entries.filter(e => e.id !== id)); if (editId === id) setShowForm(false); }

  async function importGoogleRatings(key) {
    const toImport = entries.filter(e => !e.googleRating);
    if (!toImport.length) { setImportStatus("done"); setTimeout(() => setImportStatus(null), 3000); return; }
    setImportStatus("running"); setImportProgress({ done:0, total:toImport.length });
    let updated = [...entries];
    for (let i = 0; i < toImport.length; i++) {
      const entry = toImport[i];
      try {
        const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
          method:"POST",
          headers:{ "Content-Type":"application/json", "X-Goog-Api-Key":key, "X-Goog-FieldMask":"places.rating,places.userRatingCount" },
          body: JSON.stringify({ textQuery:`${entry.place} ${entry.area} Ho Chi Minh City Vietnam` }),
        });
        const data = await res.json();
        if (data.places?.[0]) {
          const p = data.places[0];
          updated = updated.map(e => e.id === entry.id ? {
            ...e,
            googleRating: p.rating != null ? String(p.rating) : e.googleRating,
            googleReviewCount: p.userRatingCount != null ? p.userRatingCount.toLocaleString() : e.googleReviewCount,
          } : e);
        }
      } catch (err) { console.warn(`Skipped ${entry.place}:`, err); }
      setImportProgress({ done:i+1, total:toImport.length });
      if (i < toImport.length - 1) await new Promise(r => setTimeout(r, 220));
    }
    persist(updated); setImportStatus("done"); setTimeout(() => setImportStatus(null), 4000);
  }

  function handleImportClick() {
    const stored = localStorage.getItem("google-places-key");
    if (stored) { importGoogleRatings(stored); }
    else { setShowApiInput(true); }
  }

  function handleApiKeySubmit() {
    if (!apiKeyDraft.trim()) return;
    localStorage.setItem("google-places-key", apiKeyDraft.trim());
    setShowApiInput(false); setApiKeyDraft("");
    importGoogleRatings(apiKeyDraft.trim());
  }

  const counts = {
    all: entries.length,
    tried: entries.filter(e => e.status === "tried").length,
    fav: entries.filter(e => e.status === "fav").length,
    want: entries.filter(e => e.status === "want").length,
  };
  const pct = entries.length ? Math.round(((counts.tried + counts.fav) / entries.length) * 100) : 0;

  const filtered = entries.filter(e => {
    if (filter !== "all" && e.status !== filter) return false;
    if (cuisineFilter !== "All Cuisines" && e.cuisine !== cuisineFilter) return false;
    if (districtFilter !== "All Districts" && getDistrict(e.area) !== districtFilter) return false;
    if (vibeFilter !== "All Vibes" && e.vibe !== vibeFilter) return false;
    if (budgetTierFilter !== "All Budgets" && e.budgetTier !== budgetTierFilter) return false;
    if (search && ![e.place, e.area, e.cuisine, e.mustTry, e.vibe, e.notes].some(f => f?.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const allVibes = [...new Set(entries.map(e => e.vibe).filter(Boolean))].sort();

  const tagStyle = (status) => {
    const base = { fontWeight:600, fontSize:10, letterSpacing:".13em", textTransform:"uppercase", padding:"4px 9px", borderRadius:2, display:"inline-block" };
    if (status === "fav")   return { ...base, background:A, color:BG, border:`1px solid ${A}` };
    if (status === "tried") return { ...base, background:TK, color:BG, border:`1px solid ${TK}` };
    return { ...base, background:"transparent", color:"#8E867A", border:`1px solid ${B2}` };
  };

  const toggleLabel = s => s === "want" ? "Mark visited" : s === "tried" ? "Mark favourite" : "Reset to to-try";

  const TIER_COLORS = { S:"#1A3A4A", A:"#2D6E4E", B:"#D4A020", C:"#888" };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Archivo:wght@400;500;600;700&display=swap');
    html,body,#root{background:#FBF9F4;margin:0;padding:0;max-width:none;width:100%;text-align:left;}
    *{box-sizing:border-box;margin:0;padding:0;}
    ::selection{background:${A};color:${BG};}
    input::placeholder,textarea::placeholder{color:#B3A998;}
    input,select,textarea,button{font-family:'Archivo',sans-serif;}
    select{appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%23C0442B' stroke-width='1.4' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 2px center;padding-right:20px;}
    ::-webkit-scrollbar{width:9px;}::-webkit-scrollbar-thumb{background:#DAD2C4;border-radius:0;}::-webkit-scrollbar-track{background:transparent;}
    @keyframes modalIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    .card{transition:box-shadow .2s ease,transform .2s ease;}
    .card:hover{box-shadow:0 16px 34px -20px rgba(45,33,15,.4);transform:translateY(-3px);}
    .photo-slot:hover .photo-hint{opacity:1!important;}
    .tab-btn:not(.active):hover{background:rgba(26,24,21,.06);}
    .row-btn:hover{background:${TK}!important;color:${BG}!important;border-color:${TK}!important;}
    .icon-btn:hover{border-color:${TK}!important;color:${TK}!important;}
    .del-btn:hover{border-color:${A}!important;color:${A}!important;}
    .star:hover{transform:scale(1.22);}
    .map-link:hover{color:${A}!important;}
    .clear-btn:hover{background:${TK}!important;color:${BG}!important;}
    .save-btn:hover{background:${A}!important;border-color:${A}!important;}
    .cancel-btn:hover{border-color:${TK}!important;}
    .remove-link:hover{text-decoration:underline;}
    .switch-btn:hover{border-color:${TK}!important;color:${TK}!important;}
    .import-btn:hover{color:${A}!important;border-color:${A}!important;}
  `;

  const inputStyle = { border:`1px solid ${B2}`, background:"#FFF", borderRadius:2, padding:"11px 12px", fontSize:14, color:TK, outline:"none", width:"100%" };
  const selectStyle = { border:"none", borderBottom:`1px solid ${B2}`, background:"transparent", fontSize:13, fontWeight:500, color:TK, padding:"0 20px 4px 0", cursor:"pointer", outline:"none" };

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:BG, fontFamily:"'Archivo',sans-serif", color:"#8E867A", fontSize:14 }}>
      Loading the passport…
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:BG, fontFamily:"'Archivo',sans-serif", color:TK, WebkitFontSmoothing:"antialiased" }}>
      <style>{css}</style>

      {/* ── UTILITY BAR ── */}
      <div style={{ borderBottom:`1px solid ${B1}`, background:BG }}>
        <div style={{ padding:"0 5%", height:54, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:A, display:"inline-block" }} />
            <span style={{ fontWeight:700, fontSize:12, letterSpacing:".22em", textTransform:"uppercase" }}>The Passport</span>
            <span style={{ fontSize:12, letterSpacing:".18em", textTransform:"uppercase", color:"#A89E8E" }}>— Eating Journals</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:11, letterSpacing:".16em", textTransform:"uppercase", color:"#A89E8E", marginRight:4 }}>Journal</span>
            <button className="switch-btn" onClick={onSwitch} style={{ background:"transparent", border:`1px solid ${B2}`, color:"#8E867A", borderRadius:999, padding:"6px 14px", fontSize:12, fontWeight:500, cursor:"pointer", letterSpacing:".02em", transition:"all .15s" }}>Melbourne</button>
            <button style={{ background:TK, border:`1px solid ${TK}`, color:BG, borderRadius:999, padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"default", letterSpacing:".02em" }}>Hồ Chí Minh</button>
          </div>
        </div>
      </div>

      {/* ── MASTHEAD ── */}
      <header style={{ padding:"62px 5% 0" }}>
        <div style={{ fontWeight:600, fontSize:13, letterSpacing:".24em", textTransform:"uppercase", color:A }}>An Eating Guide&nbsp;&nbsp;·&nbsp;&nbsp;Hồ Chí Minh City</div>
        <h1 style={{ fontFamily:"'Newsreader',serif", fontWeight:500, fontSize:78, lineHeight:.96, letterSpacing:"-.02em", color:TK, marginTop:20 }}>
          Food <em style={{ fontStyle:"italic", fontWeight:400, color:A }}>Passport</em>
        </h1>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end", gap:36, marginTop:30 }}>
          <p style={{ maxWidth:430, fontSize:16, lineHeight:1.6, color:"#5A544B" }}>
            A working list of <strong style={{ fontWeight:600, color:TK }}>{entries.length} tables</strong> worth crossing town for — every one under 1,000,000₫ a head. Mark them off as you eat your way across the city.
          </p>
          <div style={{ display:"flex", alignItems:"stretch" }}>
            {[["Spots", counts.all, TK], ["Visited", counts.tried, TK], ["Favourites", counts.fav, A]].map(([lbl, val, col]) => (
              <div key={lbl} style={{ padding:"0 22px", borderLeft:`1px solid ${B1}` }}>
                <div style={{ fontFamily:"'Newsreader',serif", fontSize:34, fontWeight:500, lineHeight:1, color:col }}>{val}</div>
                <div style={{ fontSize:10, fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082", marginTop:6 }}>{lbl}</div>
              </div>
            ))}
            <div style={{ padding:"0 0 0 22px", borderLeft:`1px solid ${B1}`, display:"flex", flexDirection:"column", justifyContent:"flex-end", minWidth:140 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:7 }}>
                <span style={{ fontSize:10, fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Completed</span>
                <span style={{ fontFamily:"'Newsreader',serif", fontSize:17, color:TK }}>{pct}%</span>
              </div>
              <div style={{ width:"100%", height:4, background:B1, overflow:"hidden" }}>
                <div style={{ height:"100%", background:A, width:`${pct}%`, transition:"width .5s ease" }} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderBottom:`1px solid ${TK}`, marginTop:34 }} />
      </header>

      {/* ── STICKY CONTROLS ── */}
      <div style={{ position:"sticky", top:0, zIndex:30, background:"rgba(251,249,244,.92)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", borderBottom:`1px solid ${B1}` }}>
        <div style={{ padding:"10px 5%", display:"flex", flexDirection:"column", gap:10 }}>
          {/* Row 1: tabs + import + add */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:4, flexWrap:"wrap" }}>
              {[["all","All",counts.all],["want","To Try",counts.want],["tried","Visited",counts.tried],["fav","Favourites",counts.fav]].map(([key,lbl,cnt]) => {
                const active = filter === key;
                return (
                  <button key={key} className={active?"":"tab-btn"} onClick={() => setFilter(key)} style={{ display:"inline-flex", alignItems:"center", gap:7, background:active?TK:"transparent", color:active?BG:"#6E675E", border:`1px solid ${active?TK:"transparent"}`, borderRadius:2, padding:"7px 13px", fontSize:13, fontWeight:600, letterSpacing:".02em", cursor:"pointer", transition:"all .15s ease" }}>
                    <span>{lbl}</span>
                    <span style={{ fontSize:11, color:active?"rgba(251,249,244,.6)":"#B3A998" }}>{cnt}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {importStatus === "running" ? (
                <span style={{ fontSize:12, color:"#6E675E", letterSpacing:".02em" }}>Fetching {importProgress.done}/{importProgress.total}…</span>
              ) : importStatus === "done" ? (
                <span style={{ fontSize:12, color:"#2D6E4E", letterSpacing:".02em" }}>✓ Ratings imported</span>
              ) : (
                <button className="import-btn" onClick={handleImportClick} style={{ background:"transparent", border:`1px solid ${B2}`, color:"#6E675E", borderRadius:2, padding:"7px 12px", fontSize:12, fontWeight:600, cursor:"pointer", letterSpacing:".02em", transition:"all .15s", display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ background:"#4285F4", color:"white", borderRadius:2, fontSize:8, fontWeight:800, padding:"1px 4px" }}>G</span>
                  Import Ratings
                </button>
              )}
              <button onClick={() => { setEditId(null); setForm(emptyForm()); setShowForm(true); }} style={{ background:TK, color:BG, border:"none", borderRadius:2, padding:"10px 16px", fontSize:13, fontWeight:600, letterSpacing:".02em", cursor:"pointer", transition:"background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = A} onMouseLeave={e => e.currentTarget.style.background = TK}>
                + Add spot
              </button>
            </div>
          </div>
          {/* Row 2: filters */}
          <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", paddingBottom:4 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, borderBottom:`1px solid ${B2}`, paddingBottom:4 }}>
              <span style={{ color:A, fontSize:14 }}>⌕</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search places, areas, dishes…" style={{ border:"none", background:"transparent", fontSize:14, color:TK, width:200, outline:"none" }} />
            </div>
            <select value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)} style={selectStyle}>
              <option>All Cuisines</option>
              {CUISINES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} style={selectStyle}>
              {ALL_DISTRICTS.map(d => <option key={d}>{d}</option>)}
            </select>
            <select value={vibeFilter} onChange={e => setVibeFilter(e.target.value)} style={selectStyle}>
              <option>All Vibes</option>
              {allVibes.map(v => <option key={v}>{v}</option>)}
            </select>
            <select value={budgetTierFilter} onChange={e => setBudgetTierFilter(e.target.value)} style={selectStyle}>
              <option>All Budgets</option>
              {["Budget","Mid-range","Premium under 1m"].map(t => <option key={t}>{t}</option>)}
            </select>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", color:"#B3A998", marginLeft:"auto" }}>{filtered.length} spots</span>
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <main style={{ padding:"26px 5% 96px" }}>
        {filtered.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))", gap:22 }}>
            {filtered.map(entry => (
              <article key={entry.id} className="card" style={{ display:"flex", flexDirection:"column", background:"#FFF", border:`1px solid ${B1}`, borderRadius:2, overflow:"hidden" }}>

                {/* Photo slot */}
                <div className="photo-slot" onClick={() => document.getElementById(`hph-${entry.id}`).click()} style={{ position:"relative", width:"100%", aspectRatio:"4/3", background:"#F1EBDF", borderBottom:`1px solid ${B1}`, overflow:"hidden", cursor:"pointer" }}>
                  {photos[entry.id]
                    ? <img src={photos[entry.id]} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} alt="" />
                    : <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:6 }}>
                        <span style={{ fontSize:22, color:B2 }}>+</span>
                        <span className="photo-hint" style={{ fontSize:10, color:"#B3A998", letterSpacing:".12em", textTransform:"uppercase", fontWeight:600, opacity:0, transition:"opacity .15s" }}>Add photo</span>
                      </div>
                  }
                  <input id={`hph-${entry.id}`} type="file" accept="image/*" style={{ display:"none" }} onChange={e => handlePhoto(entry.id, e.target.files?.[0])} onClick={e => e.stopPropagation()} />
                  {entry.status === "fav" && (
                    <span style={{ position:"absolute", top:12, left:12, background:A, color:BG, fontSize:10, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", padding:"5px 9px", borderRadius:2 }}>Favourite</span>
                  )}
                  {entry.status === "tried" && (
                    <span style={{ position:"absolute", top:12, left:12, background:TK, color:BG, fontSize:10, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", padding:"5px 9px", borderRadius:2 }}>Visited</span>
                  )}
                </div>

                {/* Body */}
                <div style={{ display:"flex", flexDirection:"column", gap:13, padding:"18px 18px 16px", flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 }}>
                    <span style={{ fontWeight:600, fontSize:11, letterSpacing:".16em", textTransform:"uppercase", color:A }}>
                      {entry.cuisine.replace(/[^\x00-\x7F \u0080-\uFFFF]/g,'').replace(/[🇦-🇿]{2}/g,'').trim() || entry.cuisine}
                    </span>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      {entry.tier && <span style={{ fontWeight:800, fontSize:10, letterSpacing:".1em", padding:"3px 8px", borderRadius:2, background:TIER_COLORS[entry.tier]||"#888", color:"white" }}>{entry.tier}</span>}
                      <span style={tagStyle(entry.status)}>
                        {entry.status === "fav" ? "Favourite" : entry.status === "tried" ? "Visited" : "To Try"}
                      </span>
                    </div>
                  </div>

                  <h3 style={{ fontFamily:"'Newsreader',serif", fontWeight:500, fontSize:22, lineHeight:1.14, letterSpacing:"-.01em", color:TK }}>{entry.place}</h3>

                  <div style={{ display:"flex", flexDirection:"column", borderTop:"1px solid #EFEAE0", marginTop:2 }}>
                    {[
                      ["Area",      entry.area || "—"],
                      ["Budget",    entry.budget ? `${entry.budget} ₫` : "—"],
                      ["Must Try",  entry.mustTry || "—"],
                      ...(entry.vibe ? [["Vibe", entry.vibe]] : []),
                      ...(entry.googleRating ? [["G Rating", `${parseFloat(entry.googleRating).toFixed(1)} ★${entry.googleReviewCount ? `  (${entry.googleReviewCount})` : ""}`]] : []),
                    ].map(([lbl, val]) => (
                      <div key={lbl} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:12, padding:"9px 0", borderBottom:"1px solid #EFEAE0" }}>
                        <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#A89E8E", flexShrink:0 }}>{lbl}</span>
                        <span style={{ fontSize:13, color:"#3A352E", textAlign:"right" }}>
                          {lbl === "Budget" && entry.budgetTier
                            ? <><span style={{ fontFamily:"'Newsreader',serif", fontSize:15 }}>{entry.budget}</span> ₫ <span style={{ fontSize:11, color:"#9A9082", marginLeft:4 }}>· {entry.budgetTier}</span></>
                            : val
                          }
                        </span>
                      </div>
                    ))}
                    {entry.notes && (
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:12, padding:"9px 0", borderBottom:"1px solid #EFEAE0" }}>
                        <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#A89E8E", flexShrink:0 }}>Notes</span>
                        <span style={{ fontSize:13, color:"#3A352E", textAlign:"right", fontStyle:"italic" }}>{entry.notes}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, marginTop:"auto", borderTop:"1px solid #EFEAE0" }}>
                    <div style={{ display:"flex", gap:3 }}>
                      {[1,2,3,4,5].map(n => (
                        <span key={n} className="star" onClick={() => setRating(entry.id, n)} style={{ cursor:"pointer", fontSize:16, lineHeight:1, color:n<=(entry.rating||0)?A:"#D8D0C2", transition:"transform .12s ease", display:"inline-block" }}>
                          {n <= (entry.rating||0) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    {entry.mapsUrl && entry.mapsUrl !== "#" && (
                      <a href={entry.mapsUrl} target="_blank" rel="noopener noreferrer" className="map-link" style={{ fontSize:12, fontWeight:600, letterSpacing:".04em", color:TK, textDecoration:"none", borderBottom:`1px solid ${A}`, paddingBottom:1, transition:"color .12s" }}>Map ↗</a>
                    )}
                  </div>

                  <div style={{ display:"flex", gap:7 }}>
                    <button className="row-btn" onClick={() => cycleStatus(entry.id)} style={{ flex:1, border:`1px solid ${B2}`, background:BG, fontWeight:600, fontSize:12, letterSpacing:".03em", color:TK, padding:"9px 12px", borderRadius:2, cursor:"pointer", transition:"all .15s ease" }}>
                      {toggleLabel(entry.status)}
                    </button>
                    <button className="icon-btn" onClick={() => startEdit(entry)} title="Edit" style={{ width:36, border:`1px solid ${B2}`, background:BG, color:"#6E675E", fontSize:14, borderRadius:2, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .15s ease" }}>✎</button>
                    <button className="del-btn" onClick={() => deleteEntry(entry.id)} title="Remove" style={{ width:36, border:`1px solid ${B2}`, background:BG, color:"#6E675E", fontSize:13, borderRadius:2, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .15s ease" }}>✕</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"90px 20px", border:`1px dashed ${B2}`, borderRadius:2 }}>
            <div style={{ fontFamily:"'Newsreader',serif", fontStyle:"italic", fontSize:28, color:TK }}>Nothing on the table.</div>
            <p style={{ fontSize:14, color:"#8E867A", marginTop:10 }}>No spots match these filters. Try clearing your search.</p>
            <button className="clear-btn" onClick={() => { setFilter("all"); setCuisineFilter("All Cuisines"); setDistrictFilter("All Districts"); setVibeFilter("All Vibes"); setBudgetTierFilter("All Budgets"); setSearch(""); }} style={{ marginTop:22, background:"transparent", border:`1px solid ${TK}`, color:TK, padding:"10px 20px", fontSize:13, fontWeight:600, borderRadius:2, cursor:"pointer", transition:"all .15s" }}>
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* ── ADD / EDIT MODAL ── */}
      {showForm && (
        <div onClick={() => setShowForm(false)} style={{ position:"fixed", inset:0, zIndex:60, background:"rgba(26,24,21,.55)", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"48px 20px", overflow:"auto", animation:"fadeIn .15s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width:"min(600px,100%)", background:BG, border:`1px solid ${TK}`, borderRadius:3, padding:34, animation:"modalIn .22s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
              <div>
                <div style={{ fontWeight:600, fontSize:11, letterSpacing:".2em", textTransform:"uppercase", color:A }}>{editId ? "Edit entry" : "New entry"}</div>
                <h2 style={{ fontFamily:"'Newsreader',serif", fontWeight:500, fontSize:30, color:TK, marginTop:6 }}>{editId ? "Edit spot" : "Add a spot"}</h2>
              </div>
              <button onClick={() => setShowForm(false)} style={{ background:"transparent", border:"none", fontSize:22, color:"#8E867A", cursor:"pointer" }}
                onMouseEnter={e => e.target.style.color = TK} onMouseLeave={e => e.target.style.color = "#8E867A"}>✕</button>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Place name</span>
                <input value={form.place} onChange={e => setForm(f => ({...f, place:e.target.value}))} placeholder="e.g. Pizza 4P's" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
              </label>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Cuisine</span>
                  <select value={form.cuisine} onChange={e => setForm(f => ({...f, cuisine:e.target.value}))} style={inputStyle}>
                    {CUISINES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Status</span>
                  <select value={form.status} onChange={e => setForm(f => ({...f, status:e.target.value}))} style={inputStyle}>
                    <option value="want">To Try</option>
                    <option value="tried">Visited</option>
                    <option value="fav">Favourite</option>
                  </select>
                </label>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Area / District</span>
                  <input value={form.area||""} onChange={e => setForm(f => ({...f, area:e.target.value}))} placeholder="e.g. Q1 / Bến Thành" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
                </label>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Budget / head</span>
                  <input value={form.budget||""} onChange={e => setForm(f => ({...f, budget:e.target.value}))} placeholder="e.g. 300k–700k" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
                </label>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Budget Tier</span>
                  <select value={form.budgetTier||""} onChange={e => setForm(f => ({...f, budgetTier:e.target.value}))} style={inputStyle}>
                    <option value="">—</option>
                    {["Budget","Mid-range","Premium under 1m"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Vibe</span>
                  <input value={form.vibe||""} onChange={e => setForm(f => ({...f, vibe:e.target.value}))} placeholder="e.g. Rooftop, Date night…" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
                </label>
              </div>

              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Must Try 🍽</span>
                <input value={form.mustTry||""} onChange={e => setForm(f => ({...f, mustTry:e.target.value}))} placeholder="e.g. Xiao long bao, BBQ ribs…" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
              </label>

              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Maps link</span>
                <input value={form.mapsUrl||""} onChange={e => setForm(f => ({...f, mapsUrl:e.target.value}))} placeholder="https://maps.google.com/?q=…" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
              </label>

              <div style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:14 }}>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082", display:"flex", alignItems:"center", gap:4 }}>
                    <span style={{ background:"#4285F4", color:"white", borderRadius:2, fontSize:8, fontWeight:800, padding:"1px 4px" }}>G</span> Score
                  </span>
                  <input type="number" min="0" max="5" step="0.1" value={form.googleRating||""} onChange={e => setForm(f => ({...f, googleRating:e.target.value}))} placeholder="4.3" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
                </label>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Reviews</span>
                  <input value={form.googleReviewCount||""} onChange={e => setForm(f => ({...f, googleReviewCount:e.target.value}))} placeholder="e.g. 2,847" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
                </label>
              </div>

              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Notes</span>
                <textarea value={form.notes||""} onChange={e => setForm(f => ({...f, notes:e.target.value}))} rows={2} placeholder="What to order, who to bring…" style={{ ...inputStyle, resize:"vertical", fontFamily:"'Archivo',sans-serif" }}
                  onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
              </label>

              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Your rating</span>
                <div style={{ display:"flex", gap:4 }}>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className="star" onClick={() => setForm(f => ({...f, rating: f.rating === n ? 0 : n}))} style={{ cursor:"pointer", fontSize:22, lineHeight:1, color:n<=(form.rating||0)?A:"#D8D0C2", display:"inline-block" }}>
                      {n <= (form.rating||0) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>

              {form.status !== "want" && (
                <div>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082", display:"block", marginBottom:8 }}>Your Tier</span>
                  <div style={{ display:"flex", gap:8 }}>
                    {["S","A","B","C"].map(t => (
                      <button key={t} type="button" onClick={() => setForm(f => ({...f, tier: f.tier===t ? "" : t}))} style={{ flex:1, padding:"8px", borderRadius:2, border:"none", fontWeight:800, fontSize:14, letterSpacing:1, background: form.tier===t ? (TIER_COLORS[t]||"#888") : B1, color: form.tier===t ? "white" : "#888", cursor:"pointer", transition:"all .15s" }}>{t}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginTop:28, paddingTop:20, borderTop:`1px solid ${B1}` }}>
              {editId !== null && (
                <button className="remove-link" onClick={() => { deleteEntry(editId); setShowForm(false); }} style={{ background:"transparent", border:"none", color:A, fontSize:13, fontWeight:600, cursor:"pointer", letterSpacing:".02em" }}>
                  Remove spot
                </button>
              )}
              <div style={{ display:"flex", gap:10, marginLeft:"auto" }}>
                <button className="cancel-btn" onClick={() => setShowForm(false)} style={{ background:"transparent", border:`1px solid ${B2}`, color:TK, padding:"11px 18px", fontSize:13, fontWeight:600, borderRadius:2, cursor:"pointer", transition:"border-color .15s" }}>Cancel</button>
                <button className="save-btn" onClick={handleSubmit} style={{ background:TK, border:`1px solid ${TK}`, color:BG, padding:"11px 22px", fontSize:13, fontWeight:600, borderRadius:2, cursor:"pointer", letterSpacing:".02em", transition:"all .15s" }}>
                  {editId !== null ? "Save changes" : "Add to passport"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── API KEY MODAL ── */}
      {showApiInput && (
        <div onClick={() => setShowApiInput(false)} style={{ position:"fixed", inset:0, zIndex:70, background:"rgba(26,24,21,.55)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, animation:"fadeIn .15s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width:"min(460px,100%)", background:BG, border:`1px solid ${TK}`, borderRadius:3, padding:34, animation:"modalIn .22s ease" }}>
            <div style={{ fontWeight:600, fontSize:11, letterSpacing:".2em", textTransform:"uppercase", color:A, marginBottom:6 }}>Google Places API</div>
            <h2 style={{ fontFamily:"'Newsreader',serif", fontWeight:500, fontSize:26, color:TK, marginBottom:12 }}>Enter your API key</h2>
            <p style={{ fontSize:13, color:"#5A544B", lineHeight:1.6, marginBottom:20 }}>Saved to your browser only — never sent anywhere except Google's API.</p>
            <input autoFocus type="password" placeholder="AIza…" value={apiKeyDraft} onChange={e => setApiKeyDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && handleApiKeySubmit()} style={{ ...inputStyle, marginBottom:14 }}
              onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={handleApiKeySubmit} style={{ flex:1, background:TK, border:`1px solid ${TK}`, color:BG, padding:"12px", fontSize:13, fontWeight:600, borderRadius:2, cursor:"pointer", transition:"all .15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = A; e.currentTarget.style.borderColor = A; }} onMouseLeave={e => { e.currentTarget.style.background = TK; e.currentTarget.style.borderColor = TK; }}>
                Save &amp; Import
              </button>
              <button className="cancel-btn" onClick={() => setShowApiInput(false)} style={{ background:"transparent", border:`1px solid ${B2}`, color:TK, padding:"12px 20px", fontSize:13, fontWeight:600, borderRadius:2, cursor:"pointer", transition:"border-color .15s" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}