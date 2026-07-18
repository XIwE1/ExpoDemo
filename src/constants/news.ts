export type newsItem = {
  title: string;
  url: string;
  description: string;
  image?: string;
  tag: {
    category: string;
    time: string;
    mediaType: any;
  };
};

export const NEWS_DATA = [
  {
    title: "高压锅+法穿棒或峡谷等于版本答案？最详细的高压锅攻略",
    description:
      "新一期璀璨臻彩召唤活动上线，至臻皮肤限时加入特等奖池。限时拿下心仪至臻、臻彩、限定皮肤，更有机会12元夺宝赢自选臻彩。臻彩【天龙之子 黛安娜 赫赫龙威】，【腥红之月 劫 琉璃】已加入自选臻彩池中，以下是详细介绍。",
    url: "https://lol.qq.com/act/a202607108174tendraws32/index.html?e_code=500134",
    image: require("@/assets/images/lol.webp"),
    tag: {
      category: "活动",
      time: "2026-07-06",
      mediaType: "image",
    },
  },
  {
    title: "经典模式定档7月30日，经典·战斗之夜 8月2日登场",
    description:
      "从2011年，召唤师峡谷第一局交锋打响，到今天，亿万召唤师并肩而立，英雄联盟的热血从未冷却，属于我们的故事始终在蓬勃生长。那些最初点燃我们的经典，始终是这段旅程里滚烫而明亮的印记，今天，我们将经典重新点燃，交到每一位召唤师手中：",
    image: require("@/assets/images/lol_image2.png"),
    url: "https://lol.qq.com/act/a20260712classic/wxindex.html?e_code=500130",
    tag: {
      category: "活动",
      time: "2026-07-14",
      mediaType: "image",
    },
  },
  {
    title: "冥火、文森特之剑、AP剑圣、1%暴击符文！经典模式玩法大盘点",
    description: "经典模式即将回归，让我们一起来看看有哪些玩法值得期待吧！",
    url: "https://lol.qq.com/v/v2/detail.shtml?docid=3792167659198648455",
    // image: require("@/assets/images/lol_image3.png"),
    tag: {
      category: "攻略",
      time: "2026-07-18",
      mediaType: "video",
    },
  },
];

export const SLIDES_DATA = [
  {
    image: require("@/assets/images/lol_slide_1.jpeg"),
    url: "https://www.baidu.com",
    title: "英雄联盟经典模式",
    description: "英雄联盟经典模式定档7月30日，经典·战斗之夜 8月2日登场",
  },
  {
    image: require("@/assets/images/lol_slide_2.jpeg"),
    url: "https://lol.qq.com",
  },
  {
    image: require("@/assets/images/lol_slide_3.jpeg"),
    url: "https://101.qq.com",
  },
];
