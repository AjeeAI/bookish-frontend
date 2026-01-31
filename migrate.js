import admin from "firebase-admin";
import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

// 1. Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 2. The Data to Upload
const articles = [
  {
    title: "Substitution in the Nigerian Market",
    slug: "substitution-in-the-nigerian-market",
    category: "Articles",
    excerpt: "'It is even redder and tastier...' A look at how the Nigerian market has shifted to cheap substitutes.",
    content: `Seller: …If that one is too expensive, I have a better one that is cheaper. It is even redder and tastier than the one you want to buy. I think it is because people have not seen what is inside.\n\nBuyer: Oh, really? (sarcastically)\n\nSeller: It is true. Since the day I started using it, when I mixed it into my children’s jollof rice, if I use the one you want to buy instead, they will not eat it. This is the one they always shout for. It is the real deal.\n\n(Finally, the buyer turns the product in her hand, reads the label, checks the expiry date, production date, manufacturer, location, instructions… Slowly, she says…)\n\nBuyer: Just give me five, so I can try it first. If this thing is not good, I will be angry with you.\n\nAlthough it is not as great as the seller claimed, she continues to buy it. It is cheaper, and honestly, not that bad. Behold a typical market conversation and the mindset of the average Nigerian buyer and seller in this “new” Nigeria.\n\n### The New Nigerian Economy\n\nAs an average Nigerian who does not care for economic jargon such as GDP and the like, I understand the state of the economy by looking at the state of my pocket, the cost of essential items, the minimum wage, and the standard of living for the everyday person.\n\nWhen I was ten years old, one pack of spaghetti cost no more than 90 naira, and there were not many brands. In 2023, it cost me 550 naira. Now my preferred brand costs double the 2023 amount. Six years ago, someone earning 100,000 naira monthly might have thought that doubling their salary would allow them to save more, but time has proven that to be untrue.\n\nWhile salaries increased due to a rise in the minimum wage, expenses have also doubled, and in some cases, tripled or quadrupled. By the middle of 2025, even if one were earning triple their 2020 salary, they could no longer afford many things they once enjoyed.\n\n### Dealing with Change\n\nIf anyone wanted to study the biologists’ theory that organisms adapt to survive their current circumstances, Nigerians would be the perfect case study. To cope with the economic hardship and rising costs of goods and services, the Nigerian solution is often to produce or seek substitutes.\n\n### Substitution in the Nigerian Market\n\nMathematical substitution is straightforward, but substitution in Nigerian markets is absolutley not. Getting Product A1 instead of A2, even if they have similar names and content, does not guarantee equal satisfaction.\n\nEconomists refer to some goods as “substitute goods.” To qualify, a substitute must: Serve the same function as the original; Be sold within the same geographical area; Be used on the same occasions.\n\nNow, we see many such goods. As the price of a cheap product rises, an even cheaper “new and better” alternative is launched. It has become a rat race for temporary popularity before a newer one arrives.\n\nIn 2023, I noticed a new cola-based soft drink introduced in Lagos and Ogun, where I live. I initially thought we had enough cola brands, until I tried to buy my usual. To my surprise, sellers (I checked several) informed me that one bottle of my favourite now cost 20% more. Unwilling to pay that much, I accepted a cheaper, “equally good” substitute, the new one.\n\nAfter tasting it, I did not quite like it and went back to my usual. The general public, however, did not. Do I blame them? Absolutely not. In this era, everyone is trying to cut costs wherever possible.\n\nWhile some producers reduce product size to lower prices, others increase prices to maintain quality, and these are the ones most affected by substitutes.\n\nIf a consumer complains about a substitute’s quality, is he wrong? If producers cut quality to cut costs, are they also wrong, when we are all simply adapting to the cards that change has dealt us? Is it possible to have better substitutes? Do we already have them? These are questions we still need answers to.`,
    image: "https://res.cloudinary.com/driliwdn7/image/upload/v1769882381/Gemini_Generated_Image_v6sio8v6sio8v6si_tml0lu.png", 
    is_published: true,
    author: "Okikiade",
    created_at: new Date("2026-01-31T15:30:06")
  },
  {
    title: "How to Miss a Miracle",
    slug: "how-to-miss-a-miracle",
    category: "Stories",
    excerpt: "\"Mọ gbé o. Mo tẹ o.\" When my neighbour started wailing in proper Yoruba style yesterday, I almost ignored her. But let’s be honest, when the gist is sweet, you have to listen, abi? She’s a market trader who thought she knew how to size up customers, but her sharp mouth just cost her big time.",
    content: `Yesterday, my neighbour came in wailing. You know, with my natural preference for being alone and the strained relationship we have, I was very strongly tempted to ignore her barely muted shouts for attention. She was doing it in correct Yoruba woman style.\n\n“Mọ gbé o. Mo tẹ o.” She managed to produce those lamentations even though she did not cease her mournful sobbing.\n\nWhile I was still deciding if the best course of action was to go out and try to give her some comfort or pretend that I did not hear anything, my other neighbour came out talking and doling out palliatives so I decided to listen. They say that three is a crowd, don’t they?\n\nIt is not as though I wanted to eavesdrop o. I just wanted to know what could have happened. I was wondering if her husband had died or if someone had beat her up. Those are the top two things that could have happened. Na Naija we dey na. Ṣo!\n\nGoing nearer to the living room’s door, where I could hear the conversation (that is if you can call the monologue that) better, I practically glued my ear to the door to hear more clearly. Mentally, I thanked God that the door had a keyhole that enabled better transmission.\n\nAs my other neighbour was offering soothing words, my crying neighbour began letting out a stream of words. With her mastery of Yoruba and English language however, I struggled to hear the gist. Don’t think I’m heartless o. When tori wey no consain u sweet, no be gist you go call am?\n\nLet me share a little background first. My neighbour, the crying one, sells clothes, those ones we call ‘ready-made’ in the busier part of our town. As it turns out, the woman, my crying neighbour, had the day before this crying incident been at her shop in the market calling on prospective customers.\n\nAfter many hours of having sold very few items and making only a paltry sum, she was getting ready to leave her shop and head home when a man stopped in front of the shop.\n\nAs she sized up the man, she concluded that he was most probably one of those people who would choose something they could not afford and then waste time haggling the price before the angry seller sent them away empty handed.\n\nLittle did she know that the man had been sent by a non-governmental organisation to do a scout for a dealer in cloths who would supply garments to some orphanages they supported.\n\nAfter insulting the man because the man had been asking about the prices of many different clothing items in her shop, she pushed him out of her shop angrily and followed it up with some carefully selected curses.\n\nArriving at the market the next morning, she asked for the owner of the shop opposite hers only for her to hear the good news of how God had visited the woman, and gave her a miracle, and promoted her when one man who came to her shop the day before returned in the morning.\n\nI’ll leave you to guess what the ‘good news’ was — the same good news that turned out to be bad news for my neighbour.\n\nI could hardly stop myself from hissing aloud. That’s exactly how people chase away their own helpers — ta! — then show up wailing, hunting for sympathy.\n\nMust she wail sef? That’s my gist jàre. I hope she learnt the lesson though the whole thing didn’t merit the way she was carrying on.`,
    image: "https://res.cloudinary.com/driliwdn7/image/upload/v1769881318/Gemini_Generated_Image_gc9g4ygc9g4ygc9g_svwdym.png", 
    is_published: true,
    author: "Okikiade",
    created_at: new Date("2026-01-31T17:47:47")
  },
  {
    title: "Dear Dee",
    slug: "dear-dee",
    category: "Articles",
    excerpt: "\"Dear Dee, We need to talk. When I first met you, I didn’t have to spend a kobo to enjoy your company. Then came the subtle suggestion: that I could unlock your heart and continued cooperation with a small monthly token of affection. I thought, “Why not?”...\"",
    content: `Dear Dee,\n\nWe need to talk. Yes, I’m talking about you and me, we, us, whatever.\n\nWhen I first met you, I didn’t have to spend a kobo to enjoy your company. For over a decade, we shared an unspoken understanding, until you started acting strangely.\n\nOne day we were just fine, and the next, you were suddenly too full to accommodate me. Then came the subtle suggestion: that I could unlock your heart and continued cooperation with a small monthly token of affection.\n\nI thought, “Why not?” After everything we had been through, I wasn’t going to let something as mundane as money come between us. So I made the sacrifice, month after month, just to keep us going. And how did you repay that loyalty? You know what, don’t answer. We both know. Which is why, yes, we really do need to talk.\n\nThe loyalty I showed was not repaid in kind. Recently, without added value or meaningful upgrades, the price of our relationship doubled, from nine hundred and fifty naira to one thousand, nine hundred naira — without explanation or apology. There were no new benefits, no extra storage, not even a polite digital thank you.\n\nThis is not the partnership I signed up for. You were once affordable, dependable, and even endearing. My ideas found their first home in Docs. My most important files were safely stored in you. My thoughts found clarity through our quiet cooperation. You never demanded much. Your support was silent, steadfast, and powerful.\n\nNow, everything feels transactional.\n\nAn increase of one hundred per cent, with nothing to show for it, makes me question your intentions. Are you offering new services? Will your CEO personally assist me in sorting my folders by tone and urgency? I doubt that very much. This is not innovation. This is exploitation.\n\nThe world is changing rapidly. Inflation is a global issue. Servers cost money. I understand that. I always have. However, raising the price without offering proportional value is not acceptable. It feels like betrayal. Every naira is stretched thin these days, and your actions have made me reconsider our arrangement.\n\nThe trust I placed in you has been eroded. My sense of security has been replaced by hesitation. What we had no longer feels mutual. This is not a partnership. This is profit over people.\n\nOver the past few days, I have looked around. There are other options. Cloud remains consistent. OneDrive has shown interest. Dropbox made an appealing offer. I ignored these gestures out of loyalty to you. However, I am now open to new beginnings.\n\nThis message is not about theatrics. Parting ways with you is not easy. You have been present through my best ideas and worst distractions. You witnessed my chaotic file-naming, tolerated needless downloads, and stored years of digital clutter without complaint. For that, I am truly grateful.\n\nStill, someone needs to draw the line, and that person must be me.\n\nYears of dependence cannot be undone in a day, but this is the first step. If you ever return to your values, and remember those who helped make you what you are, perhaps our paths will cross again.\n\nFor now, this is goodbye. Please do not auto-renew.\n\nResolutely,\nOkikiade`,
    image: "https://res.cloudinary.com/driliwdn7/image/upload/v1769891343/1_Ixb361YUlTUneQujqeMGeQ_azu4f2.webp",
    is_published: true,
    author: "Okikiade",
    created_at: new Date("2026-01-31T21:12:22")
  }
];

// 3. The Upload Function
async function migrateData() {
  console.log("🚀 Starting Migration...");

  for (const article of articles) {
    try {
      // Add to "articles" collection
      await db.collection("articles").add(article);
      console.log(`✅ Uploaded: ${article.title}`);
    } catch (error) {
      console.error(`❌ Failed: ${article.title}`, error);
    }
  }

  console.log("🎉 Migration Complete!");
}

migrateData();