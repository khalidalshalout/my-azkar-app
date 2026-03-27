import { useState, useCallback, useMemo, useEffect } from "react";

// ─── قاعدة بيانات الأذكار الكاملة من السنة النبوية ──────────────────────────
const AZKAR_DB = {
  صباح: [
    {
      id: "s1",
      text: "اللهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      fadl: "من قرأها حين يصبح أُجير من الجن حتى يمسي",
      source: "رواه الطبراني",
      count: 1,
    },
    {
      id: "s2",
      text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ\n﴿قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ﴾",
      fadl: "من قرأ المعوذتين وسورة الإخلاص ثلاث مرات حين يصبح كفتاه من كل شيء",
      source: "رواه أبو داود والترمذي",
      count: 3,
    },
    {
      id: "s3",
      text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ﴾",
      fadl: "من قرأ المعوذتين وسورة الإخلاص ثلاث مرات حين يصبح كفتاه من كل شيء",
      source: "رواه أبو داود والترمذي",
      count: 3,
    },
    {
      id: "s4",
      text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ﴾",
      fadl: "من قرأ المعوذتين وسورة الإخلاص ثلاث مرات حين يصبح كفتاه من كل شيء",
      source: "رواه أبو داود والترمذي",
      count: 3,
    },
    {
      id: "s5",
      text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
      fadl: "من أذكار الصباح الثابتة عن النبي ﷺ",
      source: "رواه مسلم",
      count: 1,
    },
    {
      id: "s6",
      text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      fadl: "من أذكار الصباح الثابتة عن النبي ﷺ",
      source: "رواه الترمذي وأبو داود",
      count: 1,
    },
    {
      id: "s7",
      text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
      fadl: "سيد الاستغفار — من قالها موقناً حين يصبح فمات من يومه دخل الجنة",
      source: "رواه البخاري",
      count: 1,
    },
    {
      id: "s8",
      text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ",
      fadl: "من قالها أربع مرات أعتقه الله من النار",
      source: "رواه أبو داود",
      count: 4,
    },
    {
      id: "s9",
      text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ، فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      fadl: "من قالها حين يصبح فقد أدى شكر يومه",
      source: "رواه أبو داود",
      count: 1,
    },
    {
      id: "s10",
      text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
      fadl: "من أذكار الصباح والمساء للعافية في البدن والحواس",
      source: "رواه أبو داود",
      count: 3,
    },
    {
      id: "s11",
      text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
      fadl: "من أذكار الصباح والمساء النبوية",
      source: "رواه أبو داود والنسائي",
      count: 3,
    },
    {
      id: "s12",
      text: "حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      fadl: "من قالها سبع مرات حين يصبح كفاه الله ما أهمه من أمر الدنيا والآخرة",
      source: "رواه أبو داود",
      count: 7,
    },
    {
      id: "s13",
      text: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      fadl: "من قالها ثلاث مرات حين يصبح لم تصبه فجأة بلاء حتى يمسي",
      source: "رواه أبو داود والترمذي",
      count: 3,
    },
    {
      id: "s14",
      text: "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِيناً، وَبِمُحَمَّدٍ ﷺ نَبِيًّا",
      fadl: "من قالها ثلاث مرات حين يصبح كان حقاً على الله أن يرضيه يوم القيامة",
      source: "رواه أحمد والترمذي",
      count: 3,
    },
    {
      id: "s15",
      text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
      fadl: "من أذكار الصباح والمساء النبوية",
      source: "رواه الحاكم",
      count: 1,
    },
    {
      id: "s16",
      text: "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ ﷺ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
      fadl: "من أذكار الصباح الثابتة عن النبي ﷺ",
      source: "رواه أحمد",
      count: 1,
    },
    {
      id: "s17",
      text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
      fadl: "من قالها مئة مرة حُطَّت خطاياه وإن كانت مثل زبد البحر",
      source: "متفق عليه",
      count: 100,
    },
    {
      id: "s18",
      text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      fadl: "من قالها مئة مرة كانت له عِدل عشر رقاب وكُتبت له مئة حسنة",
      source: "متفق عليه",
      count: 100,
    },
    {
      id: "s19",
      text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
      fadl: "من صلى عليَّ صلاةً واحدة صلى الله عليه بها عشراً",
      source: "رواه مسلم",
      count: 10,
    },
    {
      id: "s20",
      text: "سُبْحَانَ اللهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ",
      fadl: "أحب الكلام إلى الله، ولا يضرك بأيهن بدأت",
      source: "رواه مسلم",
      count: 33,
    },
    {
      id: "s21",
      text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      fadl: "من أذكار الصباح والمساء النبوية للحفظ من الهموم والديون",
      source: "رواه البخاري",
      count: 1,
    },
  ],
  مساء: [
    {
      id: "e1",
      text: "اللهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      fadl: "من قرأها حين يمسي أُجير من الجن حتى يصبح",
      source: "رواه الطبراني",
      count: 1,
    },
    {
      id: "e2",
      text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ\n﴿قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ﴾",
      fadl: "من قرأ المعوذتين وسورة الإخلاص ثلاث مرات حين يمسي كفتاه من كل شيء",
      source: "رواه أبو داود والترمذي",
      count: 3,
    },
    {
      id: "e3",
      text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ﴾",
      fadl: "من قرأ المعوذتين وسورة الإخلاص ثلاث مرات حين يمسي كفتاه من كل شيء",
      source: "رواه أبو داود والترمذي",
      count: 3,
    },
    {
      id: "e4",
      text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ﴾",
      fadl: "من قرأ المعوذتين وسورة الإخلاص ثلاث مرات حين يمسي كفتاه من كل شيء",
      source: "رواه أبو داود والترمذي",
      count: 3,
    },
    {
      id: "e5",
      text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
      fadl: "من أذكار المساء الثابتة عن النبي ﷺ",
      source: "رواه مسلم",
      count: 1,
    },
    {
      id: "e6",
      text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
      fadl: "من أذكار المساء الثابتة عن النبي ﷺ",
      source: "رواه الترمذي وأبو داود",
      count: 1,
    },
    {
      id: "e7",
      text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
      fadl: "سيد الاستغفار — من قالها موقناً حين يمسي فمات من ليلته دخل الجنة",
      source: "رواه البخاري",
      count: 1,
    },
    {
      id: "e8",
      text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ",
      fadl: "من قالها أربع مرات أعتقه الله من النار",
      source: "رواه أبو داود",
      count: 4,
    },
    {
      id: "e9",
      text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ، فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      fadl: "من قالها حين يمسي فقد أدى شكر ليلته",
      source: "رواه أبو داود",
      count: 1,
    },
    {
      id: "e10",
      text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
      fadl: "من أذكار الصباح والمساء للعافية في البدن والحواس",
      source: "رواه أبو داود",
      count: 3,
    },
    {
      id: "e11",
      text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
      fadl: "من أذكار الصباح والمساء النبوية",
      source: "رواه أبو داود والنسائي",
      count: 3,
    },
    {
      id: "e12",
      text: "حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      fadl: "من قالها سبع مرات حين يمسي كفاه الله ما أهمه من أمر الدنيا والآخرة",
      source: "رواه أبو داود",
      count: 7,
    },
    {
      id: "e13",
      text: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      fadl: "من قالها ثلاث مرات حين يمسي لم تصبه فجأة بلاء حتى يصبح",
      source: "رواه أبو داود والترمذي",
      count: 3,
    },
    {
      id: "e14",
      text: "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِيناً، وَبِمُحَمَّدٍ ﷺ نَبِيًّا",
      fadl: "من قالها ثلاث مرات حين يمسي كان حقاً على الله أن يرضيه يوم القيامة",
      source: "رواه أحمد والترمذي",
      count: 3,
    },
    {
      id: "e15",
      text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
      fadl: "من أذكار الصباح والمساء النبوية",
      source: "رواه الحاكم",
      count: 1,
    },
    {
      id: "e16",
      text: "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ ﷺ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
      fadl: "من أذكار المساء الثابتة عن النبي ﷺ",
      source: "رواه أحمد",
      count: 1,
    },
    {
      id: "e17",
      text: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      fadl: "من قالها ثلاث مرات حين يمسي لم تضره حُمةٌ تلك الليلة",
      source: "رواه أحمد والترمذي",
      count: 3,
    },
    {
      id: "e18",
      text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
      fadl: "ما سأل أحد هذا السؤال إلا وجب على الله إجابته",
      source: "رواه أبو داود وابن ماجه",
      count: 1,
    },
    {
      id: "e19",
      text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
      fadl: "من قالها مئة مرة حُطَّت خطاياه وإن كانت مثل زبد البحر",
      source: "متفق عليه",
      count: 100,
    },
    {
      id: "e20",
      text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      fadl: "من قالها مئة مرة كانت له عِدل عشر رقاب وكُتبت له مئة حسنة",
      source: "متفق عليه",
      count: 100,
    },
    {
      id: "e21",
      text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
      fadl: "من صلى عليَّ صلاةً واحدة صلى الله عليه بها عشراً",
      source: "رواه مسلم",
      count: 10,
    },
    {
      id: "e22",
      text: "سُبْحَانَ اللهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ",
      fadl: "أحب الكلام إلى الله",
      source: "رواه مسلم",
      count: 33,
    },
    {
      id: "e23",
      text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      fadl: "من أذكار الصباح والمساء النبوية للحفظ من الهموم والديون",
      source: "رواه البخاري",
      count: 1,
    },
  ],
};

const FS = {
  sm: { zikr: 17, fadl: 11, src: 10, num: 34 },
  md: { zikr: 20, fadl: 13, src: 11, num: 42 },
  lg: { zikr: 23, fadl: 15, src: 12, num: 50 },
};

function useAzkarState(azkar) {
  const [counters, setCounters] = useState(() =>
    Object.fromEntries(azkar.map((z) => [z.id, z.count]))
  );
  const [completed, setCompleted] = useState({});
  const [shaking, setShaking] = useState({});
  const [pulseId, setPulseId] = useState(null);

  const handleCount = useCallback((id, count) => {
    setCounters((prev) => {
      const cur = prev[id] ?? count;
      if (cur <= 0) return prev;
      const next = cur - 1;
      if (next === 0) {
        if (navigator.vibrate) navigator.vibrate([60, 30, 60]);
        setTimeout(() => {
          setShaking((p) => ({ ...p, [id]: false }));
          setCompleted((p) => ({ ...p, [id]: true }));
        }, 480);
        setShaking((p) => ({ ...p, [id]: true }));
      }
      setPulseId(id);
      setTimeout(() => setPulseId((p) => (p === id ? null : p)), 220);
      return { ...prev, [id]: next };
    });
  }, []);

  const reset = useCallback((azkar) => {
    setCounters(Object.fromEntries(azkar.map((z) => [z.id, z.count])));
    setCompleted({});
    setShaking({});
  }, []);

  return { counters, completed, shaking, pulseId, handleCount, reset };
}

export default function AzkarApp() {
  const [dark, setDark] = useState(false);
  const [fs, setFs] = useState("md");
  const [cat, setCat] = useState("صباح");
  const [showAd, setShowAd] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAd(true), 20000);

    // كشف iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    // إخفاء الزر إذا الموقع مفتوح أصلاً كـ PWA مثبّت
    const mq = window.matchMedia('(display-mode: standalone)');
    if (mq.matches) setIsInstalled(true);
    const mqHandler = (e) => { if (e.matches) setIsInstalled(true); };
    mq.addEventListener('change', mqHandler);

    // لقط حدث التثبيت (Android/Chrome)
    const handlePrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handlePrompt);

    const handleInstalled = () => setIsInstalled(true);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
      mq.removeEventListener('change', mqHandler);
    };
  }, []);

  const handleInstall = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((c) => {
        if (c.outcome === 'accepted') { setInstallPrompt(null); setIsInstalled(true); }
      });
    } else {
      setShowInstallGuide(true);
    }
  };

  const azkar = useMemo(() => AZKAR_DB[cat], [cat]);
  const { counters, completed, shaking, pulseId, handleCount, reset } = useAzkarState(azkar);

  const done = useMemo(() => azkar.filter((z) => completed[z.id]).length, [azkar, completed]);
  const allDone = done === azkar.length;
  const pct = azkar.length ? (done / azkar.length) * 100 : 0;

  const share = useCallback(async (z) => {
    const text = `${z.text}\n\n${z.fadl}\n${z.source}`;
    if (navigator.share) {
      try { await navigator.share({ title: "ذكر", text }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(text); alert("تم النسخ!"); } catch {}
    }
  }, []);

  const clr = {
    bg: dark ? "#0d1117" : "#f7f3ec",
    card: dark ? "#161b24" : "#fff",
    border: dark ? "#21262d" : "#e8e2d8",
    txt: dark ? "#e6dfd0" : "#1c1710",
    sub: dark ? "#6e6558" : "#9a8a6a",
    gold: dark ? "#c9a84c" : "#8b6210",
    goldTxt: dark ? "#0d1117" : "#fff",
    pgBg: dark ? "#21262d" : "#e8e2d8",
    greenBg: dark ? "#0a1f10" : "#f0fff4",
    greenBdr: "#22c55e55",
  };

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: clr.bg, fontFamily: "'Cairo',sans-serif", transition: "background .4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        button{cursor:pointer;border:none;background:none;font-family:inherit}
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
        @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .up{animation:up .3s ease both}
        .shake{animation:shake .45s ease}
        .bar{transition:width .4s ease}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#c9a84c33;border-radius:2px}
      `}</style>

      {/* Header */}
      <header style={{ position:"sticky",top:0,zIndex:50,background:clr.card,borderBottom:`1px solid ${clr.border}` }}>
        <div style={{ maxWidth:520,margin:"0 auto",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ fontSize:26 }}>{cat === "صباح" ? "🌅" : "🌙"}</span>
            <div>
              <div style={{ fontWeight:700,fontSize:17,color:clr.txt }}>أذكاري</div>
              <div style={{ fontSize:11,color:clr.sub }}>{done}/{azkar.length} مكتمل</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}>
            <div style={{ display:"flex",borderRadius:10,overflow:"hidden",border:`1px solid ${clr.border}` }}>
              {["sm","md","lg"].map(s => (
                <button key={s} onClick={() => setFs(s)} style={{
                  padding:"4px 9px",fontSize:12,fontFamily:"inherit",
                  background: fs===s ? clr.gold : "transparent",
                  color: fs===s ? clr.goldTxt : clr.sub,
                  transition:"all .2s",
                }}>
                  {s==="sm"?"ص":s==="md"?"و":"ك"}
                </button>
              ))}
            </div>
            <button onClick={() => setDark(!dark)} style={{
              width:36,height:36,borderRadius:10,border:`1px solid ${clr.border}`,
              fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",
            }}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
        <div style={{ height:3,background:clr.pgBg }}>
          <div className="bar" style={{ height:"100%",width:`${pct}%`,background:allDone?"#22c55e":clr.gold,borderRadius:"0 2px 2px 0" }} />
        </div>
      </header>

      {/* ── بانر التثبيت — يظهر دائماً ما لم يكن التطبيق مثبتاً ── */}
      {!isInstalled && (
        <div style={{
          maxWidth:520,margin:"0 auto",padding:"8px 16px 0",
        }}>
          <button onClick={handleInstall} style={{
            width:"100%",padding:"10px 16px",borderRadius:12,
            background:`${clr.gold}18`,border:`1px solid ${clr.gold}55`,
            display:"flex",alignItems:"center",justifyContent:"center",gap:8,
            fontFamily:"inherit",cursor:"pointer",transition:"all .2s",
          }}>
            <span style={{ fontSize:18 }}>📲</span>
            <span style={{ fontSize:13,fontWeight:700,color:clr.gold }}>
              أضف التطبيق لشاشتك الرئيسية
            </span>
          </button>
        </div>
      )}

      {/* Tabs */}
      <div style={{ maxWidth:520,margin:"0 auto",padding:"10px 16px 6px",display:"flex",gap:8 }}>
        {["صباح","مساء"].map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding:"7px 20px",borderRadius:20,fontSize:14,fontWeight:600,fontFamily:"inherit",
            background: cat===c ? clr.gold : clr.card,
            color: cat===c ? clr.goldTxt : clr.sub,
            border:`1px solid ${cat===c ? clr.gold : clr.border}`,
            transition:"all .2s",
          }}>
            {c==="صباح" ? "🌅 الصباح" : "🌙 المساء"}
          </button>
        ))}
        <button onClick={() => reset(azkar)} style={{
          marginRight:"auto",padding:"7px 16px",borderRadius:20,fontSize:13,fontFamily:"inherit",
          color:clr.sub,border:`1px solid ${clr.border}`,transition:"all .2s",
        }}>↺ إعادة</button>
      </div>

      {/* Cards */}
      <main style={{ maxWidth:520,margin:"0 auto",padding:"8px 16px 90px" }}>
        {azkar.map((z, i) => {
          const isDone = completed[z.id];
          const rem = counters[z.id] ?? z.count;
          const pg = ((z.count - rem) / z.count) * 100;
          const f = FS[fs];
          return (
            <div key={z.id} className={`up ${shaking[z.id] ? "shake" : ""}`}
              style={{
                marginBottom:14,borderRadius:18,overflow:"hidden",
                border:`1px solid ${isDone ? clr.greenBdr : clr.border}`,
                background: isDone ? clr.greenBg : clr.card,
                transition:"border-color .4s,background .4s",
                animationDelay:`${i*45}ms`,
              }}>
              <div style={{ height:2,background:clr.pgBg }}>
                <div className="bar" style={{ height:"100%",width:`${pg}%`,background:isDone?"#22c55e":clr.gold }} />
              </div>
              <div style={{ padding:"15px 17px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                  <span style={{
                    fontSize:11,padding:"3px 10px",borderRadius:20,
                    background: dark ? "#21262d" : "#f0ead8",color:clr.sub,
                  }}>
                    {cat} · {z.count === 1 ? "مرة" : `${z.count}×`}
                  </span>
                  {isDone && <span style={{ fontSize:13,color:"#22c55e",fontWeight:700 }}>✓ مكتمل</span>}
                </div>

                <p style={{ fontSize:f.zikr,fontWeight:700,lineHeight:2,color:clr.txt,marginBottom:11,whiteSpace:"pre-line" }}>
                  {z.text}
                </p>

                <p style={{ fontSize:f.fadl,color:clr.sub,lineHeight:1.75,marginBottom:14,paddingRight:10,borderRight:`2px solid ${clr.gold}44` }}>
                  {z.fadl}
                  <span style={{ display:"block",fontSize:f.src,marginTop:2,opacity:.65 }}>{z.source}</span>
                </p>

                <div style={{ display:"flex",gap:10 }}>
                  <button
                    onClick={() => handleCount(z.id, z.count)}
                    disabled={isDone}
                    style={{
                      flex:1,padding:"14px 10px",borderRadius:14,fontFamily:"inherit",fontWeight:900,
                      background: isDone ? "#22c55e" : clr.gold,
                      color: isDone ? "#fff" : clr.goldTxt,
                      cursor: isDone ? "default" : "pointer",
                      transform: pulseId===z.id ? "scale(0.96)" : "scale(1)",
                      transition:"transform .15s,background .3s",
                      boxShadow: isDone ? "0 4px 14px #22c55e33" : `0 4px 14px ${clr.gold}33`,
                      lineHeight:1.1,
                    }}>
                    <span style={{ display:"block",fontSize:f.num }}>{isDone ? "✓" : rem}</span>
                    {!isDone && <span style={{ fontSize:10,opacity:.7,display:"block",marginTop:3 }}>اضغط للعدّ</span>}
                  </button>
                  <button onClick={() => share(z)} style={{
                    width:48,borderRadius:14,border:`1px solid ${clr.border}`,
                    fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",color:clr.sub,
                  }} title="مشاركة">📤</button>
                </div>
              </div>
            </div>
          );
        })}

        {allDone && (
          <div className="up" style={{
            textAlign:"center",padding:"36px 20px",borderRadius:18,
            border:clr.greenBdr,background:clr.greenBg,
          }}>
            <div style={{ fontSize:52,marginBottom:10 }}>🎉</div>
            <p style={{ fontSize:20,fontWeight:700,color:"#22c55e",marginBottom:6 }}>أحسنت! اكتملت أذكار {cat}</p>
            <p style={{ fontSize:13,color:clr.sub,marginBottom:20 }}>تقبّل الله منك</p>
            <button onClick={() => reset(azkar)} style={{
              padding:"10px 28px",borderRadius:14,background:clr.gold,color:clr.goldTxt,
              fontFamily:"inherit",fontWeight:700,fontSize:14,
            }}>البدء من جديد</button>
          </div>
        )}
      </main>


      {/* ── دليل التثبيت اليدوي ── */}
      {showInstallGuide && (
        <div style={{
          position:"fixed",inset:0,zIndex:200,
          background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",
          display:"flex",alignItems:"flex-end",justifyContent:"center",
        }} onClick={() => setShowInstallGuide(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            width:"100%",maxWidth:520,borderRadius:"20px 20px 0 0",
            background:clr.card,padding:"24px 20px 36px",
          }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <span style={{ fontWeight:700,fontSize:17,color:clr.txt }}>📲 أضف للشاشة الرئيسية</span>
              <button onClick={() => setShowInstallGuide(false)} style={{
                width:28,height:28,borderRadius:"50%",
                background:clr.pgBg,color:clr.sub,fontSize:16,
                display:"flex",alignItems:"center",justifyContent:"center",
              }}>✕</button>
            </div>
            {isIOS ? (
              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                {[
                  { n:"1", t:"افتح الموقع في متصفح Safari", i:"🧭" },
                  { n:"2", t:'اضغط على زر المشاركة ثم "إضافة إلى الشاشة الرئيسية"', i:"⬆️" },
                  { n:"3", t:'اضغط "إضافة" وستجد الأيقونة على شاشتك', i:"✅" },
                ].map(s => (
                  <div key={s.n} style={{ display:"flex",alignItems:"center",gap:12 }}>
                    <span style={{
                      width:32,height:32,borderRadius:"50%",
                      background:clr.gold,color:clr.goldTxt,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontWeight:700,fontSize:14,flexShrink:0,
                    }}>{s.n}</span>
                    <span style={{ fontSize:14,color:clr.txt,lineHeight:1.6 }}>{s.i} {s.t}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                {[
                  { n:"1", t:"افتح الموقع في متصفح Chrome", i:"🌐" },
                  { n:"2", t:'اضغط على قائمة ⋮ ثم "إضافة إلى الشاشة الرئيسية"', i:"⋮" },
                  { n:"3", t:'اضغط "إضافة" وستجد الأيقونة على شاشتك', i:"✅" },
                ].map(s => (
                  <div key={s.n} style={{ display:"flex",alignItems:"center",gap:12 }}>
                    <span style={{
                      width:32,height:32,borderRadius:"50%",
                      background:clr.gold,color:clr.goldTxt,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontWeight:700,fontSize:14,flexShrink:0,
                    }}>{s.n}</span>
                    <span style={{ fontSize:14,color:clr.txt,lineHeight:1.6 }}>{s.i} {s.t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── بانر الإعلان — يظهر بعد 20 ثانية ── */}
      {showAd && (
        <div style={{
          position:"fixed",bottom:0,left:0,right:0,zIndex:100,
          display:"flex",flexDirection:"column",alignItems:"center",
        }}>
          {/* زر الإغلاق */}
          <button
            onClick={() => setShowAd(false)}
            style={{
              alignSelf:"flex-end",marginBottom:2,marginLeft:8,marginRight:8,
              width:24,height:24,borderRadius:"50%",
              background:"rgba(0,0,0,0.5)",color:"#fff",
              fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",
              cursor:"pointer",border:"none",lineHeight:1,
            }}
          >✕</button>

          {/* ضع كود الإعلان هنا */}
          <div style={{
            width:"100%",maxWidth:520,minHeight:60,
            background: dark ? "#1a1d27" : "#fff",
            borderTop:`1px solid ${clr.border}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            padding:"8px 16px",
          }}>
            {/* === كود الإعلان === */}

            {/* === نهاية كود الإعلان === */}
          </div>
        </div>
      )}
      <footer style={{
        position:"fixed",bottom: showAd ? 76 : 0,left:0,right:0,
        background:clr.card,borderTop:`1px solid ${clr.border}`,
        padding:"8px 16px",textAlign:"center",
        transition:"bottom .3s ease",zIndex:99,
      }}>
        <p style={{ fontSize:12,color:clr.sub }}>
          {allDone ? `✓ اكتملت أذكار ${cat}` : done===0 ? "اضغط على أي بطاقة للبدء" : `${done} من ${azkar.length} ذكر مكتمل`}
        </p>
      </footer>
    </div>
  );
}
