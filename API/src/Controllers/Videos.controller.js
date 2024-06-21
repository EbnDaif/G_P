const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const searchVideos = require("../services/ThirdParty/Youtupe.api");

exports.getvideos = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const keywords = user.keywords;
  let searchResults = [];
  for (const keyword of keywords) {
    const results = await searchVideos(keyword);
    searchResults.push(...results);
  }
  searchResults.sort(() => Math.random() - 0.5);

  res.send(searchResults);
});
/*
exports.getvideos = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const keywords = user.keywords;
  let searchResults = [];
  for (const keyword of keywords) {
    const results = await searchVideos(keyword);
    searchResults.push(...results);
  }
  searchResults.sort(() => Math.random() - 0.5);
const searchResults = [
  {
    title:
      "Trap Workout Music 2024 🔥👊 Fitness, Gym, Workout Motivation Music 🔥👊 Best Trap &amp; Rap Music",
    description:
      "Trap Workout Music 2024 Fitness, Gym, Workout Motivation Music Best Trap & Rap Music ◢ Trap Music on Spotify: ...",
    thumbnail: "https://i.ytimg.com/vi/C2dMpY-gTEg/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=C2dMpY-gTEg",
    videoId: "C2dMpY-gTEg",
  },
  {
    title: "Is Mental Health Genetic, Habit, or Personality?",
    description:
      "Watch this video to find out how can you improve and master your mental health. Watch the full video - https://utm.io/ueSFn ...",
    thumbnail: "https://i.ytimg.com/vi/qN8fzqw1WAk/default.jpg",
    videolink: "https://www.youtube.com/watch?v=qN8fzqw1WAk",
    videoId: "qN8fzqw1WAk",
  },
  {
    title:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul",
    description:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul Music to sleep deeply and rest the ...",
    thumbnail: "https://i.ytimg.com/vi/HFis8t38Ajs/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=HFis8t38Ajs",
    videoId: "HFis8t38Ajs",
  },
  {
    title:
      "GET TO WORK - Best Motivational Speech Video (Featuring Eric Thomas)",
    description:
      "GET TO WORK! What you put in you will get out! Put your head down and work. One of the BEST Motivational Speeches of all time ...",
    thumbnail: "https://i.ytimg.com/vi/tBKfGiKfen8/default.jpg",
    videolink: "https://www.youtube.com/watch?v=tBKfGiKfen8",
    videoId: "tBKfGiKfen8",
  },
  {
    title:
      "🔴 Relaxing Music 24/7, Spa Music, Sleeping Music, Meditation Music, Sleep, Meditation, Water Sounds",
    description:
      "Yellow Brick Cinema's relaxation music provides calm music for inner peace and stress relief, helping you achieve ultimate Zen.",
    thumbnail: "https://i.ytimg.com/vi/z3-P0UckFVI/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=z3-P0UckFVI",
    videoId: "z3-P0UckFVI",
  },
  {
    title: "Rema, Selena Gomez - Calm Down (Official Music Video)",
    description:
      "Listen to Rema - Calm Down (with Selena Gomez) https://rema.lnk.to/CalmDownwithSelenaGomezID Stream/Download: RAVE ...",
    thumbnail: "https://i.ytimg.com/vi/WcIcVapfqXw/default.jpg",
    videolink: "https://www.youtube.com/watch?v=WcIcVapfqXw",
    videoId: "WcIcVapfqXw",
  },
  {
    title:
      "Thunderstorm Sounds for Relaxing, Focus or Deep Sleep | Nature White Noise | 8 Hour Video",
    description:
      "Download Calm: https://calm.onelink.me/314175158?pid=YT Enjoy 8 hours of the relaxing sound of thunderstorms. You can find ...",
    thumbnail: "https://i.ytimg.com/vi/q6XlcY7rL0k/default.jpg",
    videolink: "https://www.youtube.com/watch?v=q6XlcY7rL0k",
    videoId: "q6XlcY7rL0k",
  },
  {
    title:
      "5 Ways to help someone struggling with their mental health | Mental Health Season - BBC Ideas",
    description:
      "Subscribe and to the BBC https://bit.ly/BBCYouTubeSub Watch the BBC first on iPlayer https://bbc.in/iPlayer-Home 5 ...",
    thumbnail: "https://i.ytimg.com/vi/wIUcc8g17wg/default.jpg",
    videolink: "https://www.youtube.com/watch?v=wIUcc8g17wg",
    videoId: "wIUcc8g17wg",
  },
  {
    title:
      "Smooth Jazz Piano Music for Unwind, Work, Study ☕ Relaxing Jazz Music at Cozy Coffee Shop Ambience",
    description:
      "Smooth Jazz Piano Music for Unwind, Work, Study ☕ Relaxing Jazz Music at Cozy Coffee Shop Ambience | Listen on Spotify, ...",
    thumbnail: "https://i.ytimg.com/vi/Fb0pSbULsCI/default.jpg",
    videolink: "https://www.youtube.com/watch?v=Fb0pSbULsCI",
    videoId: "Fb0pSbULsCI",
  },
  {
    title:
      "Rainstorm Sounds for Relaxing, Focus or Deep Sleep | Nature White Noise | 8 Hour Video",
    description:
      "Download Calm: https://calm.onelink.me/314175158?pid=YT Enjoy 8 hours of the relaxing sound of rain on leaves. You can find ...",
    thumbnail: "https://i.ytimg.com/vi/yIQd2Ya0Ziw/default.jpg",
    videolink: "https://www.youtube.com/watch?v=yIQd2Ya0Ziw",
    videoId: "yIQd2Ya0Ziw",
  },
  {
    title: "5-Minute Meditation You Can Do Anywhere",
    description:
      "In just 5 minutes you can reset your day in a positive way. Special thanks to John Davisi for lending us his incredibly soothing ...",
    thumbnail: "https://i.ytimg.com/vi/inpok4MKVLM/default.jpg",
    videolink: "https://www.youtube.com/watch?v=inpok4MKVLM",
    videoId: "inpok4MKVLM",
  },
  {
    title: "10-Minute Meditation For Anxiety",
    description:
      "Take a moment and let this guided meditation relieve your anxiety. Written and Narrated by John Davisi. John is a mindfulness life ...",
    thumbnail: "https://i.ytimg.com/vi/O-6f5wQXSu8/default.jpg",
    videolink: "https://www.youtube.com/watch?v=O-6f5wQXSu8",
    videoId: "O-6f5wQXSu8",
  },
  {
    title:
      "Nonprofit program helps girls battle mental health while expressing themselves",
    description:
      "Girl Be Heard is an organization helping thousands of girls strengthen their mental health. NBC News' Maya Eaglin spoke with the ...",
    thumbnail: "https://i.ytimg.com/vi/ftRWszOsmz8/default.jpg",
    videolink: "https://www.youtube.com/watch?v=ftRWszOsmz8",
    videoId: "ftRWszOsmz8",
  },
  {
    title:
      "Friday Morning Jazz - Smooth Jazz Music &amp; Relaxing Bossa Nova instrumental for Keep upbeat your mood",
    description:
      "Friday Morning Jazz - Smooth Jazz Music & Relaxing Bossa Nova instrumental for Keep upbeat your mood 👉️   Let's ...",
    thumbnail: "https://i.ytimg.com/vi/0px9XfYhBTg/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=0px9XfYhBTg",
    videoId: "0px9XfYhBTg",
  },
  {
    title: "Release your mind into relaxation (Acoustic)",
    description:
      "Provided to YouTube by IIP-DDS Release your mind into relaxation (Acoustic) · Chipkungfu Release your mind into relaxation ...",
    thumbnail: "https://i.ytimg.com/vi/oYPqAavix20/default.jpg",
    videolink: "https://www.youtube.com/watch?v=oYPqAavix20",
    videoId: "oYPqAavix20",
  },
  {
    title:
      "15 Minute Guided Meditation | Strength &amp; Grounding In Stressful Times",
    description:
      "This short guided 15 minute meditation for strength and grounding will help relieve anxiety and stress during stressful and ...",
    thumbnail: "https://i.ytimg.com/vi/z0GtmPnqAd8/default.jpg",
    videolink: "https://www.youtube.com/watch?v=z0GtmPnqAd8",
    videoId: "z0GtmPnqAd8",
  },
  {
    title:
      "🔴 Beautiful Relaxing Music 24/7, Sleep Meditation Music, Stress Relief, Ambient Background Music",
    description:
      "Enjoy our latest relaxing music live stream: youtube.com/yellowbrickcinema/live Beautiful Relaxing Music 24/7, Sleep Meditation ...",
    thumbnail: "https://i.ytimg.com/vi/YNkt3j-miYI/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=YNkt3j-miYI",
    videoId: "YNkt3j-miYI",
  },
  {
    title: "We All Have Mental Health",
    description:
      "Download the accompanying teacher toolkit from https://www.annafreud.org/wahmhtoolkit It's free! We All Have Mental Health is ...",
    thumbnail: "https://i.ytimg.com/vi/DxIDKZHW3-E/default.jpg",
    videolink: "https://www.youtube.com/watch?v=DxIDKZHW3-E",
    videoId: "DxIDKZHW3-E",
  },
  {
    title:
      "&quot;I THOUGHT DEPRESSION WAS FAKE...&quot; #mentalhealth #imanamongstmen #iman #shorts",
    description: "",
    thumbnail: "https://i.ytimg.com/vi/0PTkG0osS1g/default.jpg",
    videolink: "https://www.youtube.com/watch?v=0PTkG0osS1g",
    videoId: "0PTkG0osS1g",
  },
  {
    title:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul",
    description:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul Music to sleep deeply and rest the ...",
    thumbnail: "https://i.ytimg.com/vi/5LVd0dZYrYA/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=5LVd0dZYrYA",
    videoId: "5LVd0dZYrYA",
  },
  {
    title: "Physical and Mental Health",
    description:
      "A clear distinction is often made between “mind” and “body” – but mental health and physical health should not be thought of as ...",
    thumbnail: "https://i.ytimg.com/vi/EKEWk4oWmjY/default.jpg",
    videolink: "https://www.youtube.com/watch?v=EKEWk4oWmjY",
    videoId: "EKEWk4oWmjY",
  },
  {
    title: "SHOW UP, EVEN ON YOUR WORST DAYS - Best Motivational Speeches",
    description:
      "You have to show up on your worst days. You are much closer than you think to your dreams and becoming the person you ...",
    thumbnail: "https://i.ytimg.com/vi/z2wX922i9PE/default.jpg",
    videolink: "https://www.youtube.com/watch?v=z2wX922i9PE",
    videoId: "z2wX922i9PE",
  },
  {
    title:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul",
    description:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul Music to sleep deeply and rest the ...",
    thumbnail: "https://i.ytimg.com/vi/wiyHYawETKk/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=wiyHYawETKk",
    videoId: "wiyHYawETKk",
  },
  {
    title: "Great Meditation",
    description:
      "Our channel consists of a group of individuals collaborating together to produce our very own Original guided meditations ...",
    thumbnail:
      "https://yt3.ggpht.com/ytc/AIdro_mHyJx00V3uzS4UuxNnLWIkpP5F-BqKyP2jvjYsE6aChYQ=s88-c-k-c0xffffffff-no-rj-mo",
    videolink: "https://www.youtube.com/watch?v=undefined",
  },
  {
    title:
      "#attitude #attitudestatus #motivation #religion #statusmotivational#motivationalquotes #newlife",
    description: "",
    thumbnail: "https://i.ytimg.com/vi/jXPpz3us5Zo/default.jpg",
    videolink: "https://www.youtube.com/watch?v=jXPpz3us5Zo",
    videoId: "jXPpz3us5Zo",
  },
  {
    title: "What Is Mental Health?",
    description:
      "Nowadays, we know more and more about what it means to be mentally unwell - but what exactly constitutes mental 'health'?",
    thumbnail: "https://i.ytimg.com/vi/oxx564hMBUI/default.jpg",
    videolink: "https://www.youtube.com/watch?v=oxx564hMBUI",
    videoId: "oxx564hMBUI",
  },
  {
    title: "David Goggins Motivation😈",
    description:
      "Stay tuned. Big things comming up. @peakzmotivation on all platforms . . . . . #motivation #motivationalquotes #motivational ...",
    thumbnail: "https://i.ytimg.com/vi/wCIZ8TZI2FI/default.jpg",
    videolink: "https://www.youtube.com/watch?v=wCIZ8TZI2FI",
    videoId: "wCIZ8TZI2FI",
  },
  {
    title: "10-Minute Guided Meditation: Self-Love | SELF",
    description:
      "Join Manoj Dias, meditation teacher and co-founder and VP of Open, for a 10-minute guided meditation that prioritizes self-love.",
    thumbnail: "https://i.ytimg.com/vi/vj0JDwQLof4/default.jpg",
    videolink: "https://www.youtube.com/watch?v=vj0JDwQLof4",
    videoId: "vj0JDwQLof4",
  },
  {
    title:
      "🔴 Relaxing Zen Music 24/7, Healing Music, Meditation Music, Spa Music, Sleep, Zen, Nature Sounds",
    description:
      "Yellow Brick Cinema's relaxation music provides calm music for inner peace and stress relief, helping you achieve ultimate Zen.",
    thumbnail: "https://i.ytimg.com/vi/KH3wADImOdQ/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=KH3wADImOdQ",
    videoId: "KH3wADImOdQ",
  },
  {
    title:
      "10 MIN Guided Meditation To Clear Your Mind &amp; Start New Positive Habits",
    description:
      "This 10 minute mindful meditation will give you the mental clarity and space necessary to ground yourself with beautiful focus and ...",
    thumbnail: "https://i.ytimg.com/vi/uTN29kj7e-w/default.jpg",
    videolink: "https://www.youtube.com/watch?v=uTN29kj7e-w",
    videoId: "uTN29kj7e-w",
  },
  {
    title:
      "Trap Workout Music 2024 🔥 Fitness, Gym, Workout Motivation Music 🔥 Best Trap &amp; Rap Music",
    description:
      "Trap Workout Music 2024 Fitness, Gym, Workout Motivation Music Best Trap & Rap Music ◢ Trap Music on Spotify: ...",
    thumbnail: "https://i.ytimg.com/vi/e7vIYDRF0RI/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=e7vIYDRF0RI",
    videoId: "e7vIYDRF0RI",
  },
  {
    title:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul",
    description:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul Music to sleep deeply and rest the ...",
    thumbnail: "https://i.ytimg.com/vi/HFis8t38Ajs/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=HFis8t38Ajs",
    videoId: "HFis8t38Ajs",
  },
  {
    title:
      "🔴 Relaxing Zen Music 24/7, Stress Relief Music, Sleep Music, Meditation Music, Study, Calming Music",
    description:
      "Enjoy our latest relaxing music live stream: youtube.com/yellowbrickcinema/live Relaxing Zen Music 24/7, Stress Relief Music, ...",
    thumbnail: "https://i.ytimg.com/vi/2fqPwTR-dxY/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=2fqPwTR-dxY",
    videoId: "2fqPwTR-dxY",
  },
  {
    title:
      "🔴 Relaxing Music 24/7, Spa Music, Sleeping Music, Meditation Music, Sleep, Meditation, Water Sounds",
    description:
      "Yellow Brick Cinema's relaxation music provides calm music for inner peace and stress relief, helping you achieve ultimate Zen.",
    thumbnail: "https://i.ytimg.com/vi/z3-P0UckFVI/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=z3-P0UckFVI",
    videoId: "z3-P0UckFVI",
  },
  {
    title: "Divine Melodies of the Air",
    description:
      "Provided to YouTube by The state51 Conspiracy Divine Melodies of the Air · Mindfulness Meditation Guru A Portal to the Divine: ...",
    thumbnail: "https://i.ytimg.com/vi/tACzimXBlpk/default.jpg",
    videolink: "https://www.youtube.com/watch?v=tACzimXBlpk",
    videoId: "tACzimXBlpk",
  },
  {
    title: "NO EXCUSES - Best Motivational Video",
    description:
      "https://benlionelscott.com/subscribe Download this video and audio version by ...",
    thumbnail: "https://i.ytimg.com/vi/wnHW6o8WMas/default.jpg",
    videolink: "https://www.youtube.com/watch?v=wnHW6o8WMas",
    videoId: "wnHW6o8WMas",
  },
  {
    title:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul",
    description:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul Music to sleep deeply and rest the ...",
    thumbnail: "https://i.ytimg.com/vi/sdBa5UWv4hk/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=sdBa5UWv4hk",
    videoId: "sdBa5UWv4hk",
  },
  {
    title: "BELIEVE YOU CAN - Motivational Speech Compilation",
    description:
      '"If your dreams don\'t scare you, they are too small." - Richard Branson Email(for business inquiries ...',
    thumbnail: "https://i.ytimg.com/vi/dpEJmuZEyZM/default.jpg",
    videolink: "https://www.youtube.com/watch?v=dpEJmuZEyZM",
    videoId: "dpEJmuZEyZM",
  },
  {
    title:
      "🔴 Relaxing Zen Music 24/7, Stress Relief Music, Sleep Music, Meditation Music, Study, Calming Music",
    description:
      "Enjoy our latest relaxing music live stream: youtube.com/yellowbrickcinema/live Relaxing Zen Music 24/7, Stress Relief Music, ...",
    thumbnail: "https://i.ytimg.com/vi/2fqPwTR-dxY/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=2fqPwTR-dxY",
    videoId: "2fqPwTR-dxY",
  },
  {
    title:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul",
    description:
      "Relaxing Music For Stress Relief, Anxiety and Depressive States • Heal Mind, Body and Soul Music to sleep deeply and rest the ...",
    thumbnail: "https://i.ytimg.com/vi/Kn6cweZRnL8/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=Kn6cweZRnL8",
    videoId: "Kn6cweZRnL8",
  },
  {
    title: "Late Night Lofi 🌙 [study beats] ~ Calm Your Thoughts",
    description:
      "Late Night Lofi [study beats] ~ Calm Your Thoughts https://youtube.com/live/A3ezTaNBHPA ...",
    thumbnail: "https://i.ytimg.com/vi/A3ezTaNBHPA/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=A3ezTaNBHPA",
    videoId: "A3ezTaNBHPA",
  },
  {
    title: "Calm",
    description:
      "Our mission is to make the world healthier and happier through the super power of calm. There are lots of benefits to meditation, ...",
    thumbnail:
      "https://yt3.ggpht.com/ytc/AIdro_kyX1mWTQR4tCQPDwAata5PBrUWcI_qqN27RFDrXjHk26E=s88-c-k-c0xffffffff-no-rj-mo",
    videolink: "https://www.youtube.com/watch?v=undefined",
  },
  {
    title:
      "[LIVE] Dog Music🎵Dog Calming Music for Dogs Deep Sleep🐶 🎵Separation Anxiety Music for Dog Relax🔴6",
    description:
      "[LIVE] Dog Music  Dog Calming Music for Dogs Deep Sleep   Separation Anxiety Music for Dog Relax  6 Hello The Healing ...",
    thumbnail: "https://i.ytimg.com/vi/YbAnwlncrtI/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=YbAnwlncrtI",
    videoId: "YbAnwlncrtI",
  },
  {
    title: "NEVER DOUBT YOUR VALUE - Powerful Motivational Speeches",
    description:
      "The older we get, the more life tries to make us forget how valuable we are; we want this video to remind us that you're more ...",
    thumbnail: "https://i.ytimg.com/vi/Wbc7h4P_qWA/default.jpg",
    videolink: "https://www.youtube.com/watch?v=Wbc7h4P_qWA",
    videoId: "Wbc7h4P_qWA",
  },
  {
    title:
      "🔴 Beautiful Relaxing Music 24/7, Sleep Meditation Music, Stress Relief, Ambient Background Music",
    description:
      "Enjoy our latest relaxing music live stream: youtube.com/yellowbrickcinema/live Beautiful Relaxing Music 24/7, Sleep Meditation ...",
    thumbnail: "https://i.ytimg.com/vi/YNkt3j-miYI/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=YNkt3j-miYI",
    videoId: "YNkt3j-miYI",
  },
  {
    title:
      "Why students should get mental health days - Hailey Hardcastle #shorts #tedx",
    description:
      "School can be rife with stress, anxiety, panic attacks and even burnout -- but there's often no formal policy for students who need ...",
    thumbnail: "https://i.ytimg.com/vi/3k_wxTkYN50/default.jpg",
    videolink: "https://www.youtube.com/watch?v=3k_wxTkYN50",
    videoId: "3k_wxTkYN50",
  },
  {
    title: "10 Signs Your Mental Health is Getting Worse",
    description:
      "This video is sponsored by Skillshare! The first 1000 who click the link will get a free trial of Skillshare Premium for FREE ...",
    thumbnail: "https://i.ytimg.com/vi/5bNI_NloNa8/default.jpg",
    videolink: "https://www.youtube.com/watch?v=5bNI_NloNa8",
    videoId: "5bNI_NloNa8",
  },
  {
    title:
      "🔴 24 Hours of Dog Music🎵Dog Calming Video for Dogs🐶🩷Separation Anxiety Music for dogs to go to sleep",
    description:
      "Dog Music  Dog Calming Video for Dogs    Separation Anxiety Music for dogs to go to sleep Sweet Pet Music provides relaxing ...",
    thumbnail: "https://i.ytimg.com/vi/TH5QY1WDkxM/default_live.jpg",
    videolink: "https://www.youtube.com/watch?v=TH5QY1WDkxM",
    videoId: "TH5QY1WDkxM",
  },
  {
    title:
      "Mental health and resilience - the secrets of inner strength | DW Documentary",
    description:
      "Around one billion people struggle with stress-related illness globally - and that figure is rising. What protects those with good ...",
    thumbnail: "https://i.ytimg.com/vi/YdMCL9_UTE4/default.jpg",
    videolink: "https://www.youtube.com/watch?v=YdMCL9_UTE4",
    videoId: "YdMCL9_UTE4",
  },
  {
    title: "Motivation 💪💪",
    description:
      "Clique ici pour t'abonner ▻ http://bit.ly/1qAbjhL & rejoins la TeamShape ! Mes vêtements TeamShape ▻ http://bit.ly/1wXqeD7 ...",
    thumbnail: "https://i.ytimg.com/vi/mHPM-Y6Hf_Q/default.jpg",
    videolink: "https://www.youtube.com/watch?v=mHPM-Y6Hf_Q",
    videoId: "mHPM-Y6Hf_Q",
  },
];
  res.send(searchResults);
});
*/