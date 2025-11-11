import React from "react";

// تابع تبدیل اعداد انگلیسی به اعداد پشتو
function toPashtoNumber(n) {
  const pashtoNumbers = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return n.toString().replace(/\d/g, (d) => pashtoNumbers[d]);
}

export const articlesDataPs = [
  // مقاله ۱
  {
    id: 1,
    title: "🗣️ د ماشوم د ژبې پراختیا ملاتړ",
    date: "۲ فبروري ۲۰۲۵",
    readingTime: "۹ دقیقې",
    author: "د ماشومانو د زده کړې مرکز تعلیمي ټیم",
    summary: "دغه مقاله ښيي چې څنګه د ماشومانو د ژبې ملاتړ د اړیکو او فکري مهارتونو وده کوي",
    content: (
      <div className="rtl text-right text-lg text-white/95 leading-[1.8] space-y-4">
        <p>ژبه د فکري او ټولنیز ودې لپاره اساسي مهارت دی. د ماشومانو د ژبې ملاتړ د اړیکو، سواد او عمومي زده کړې لپاره ګټور دی.</p>

        <p className="font-semibold">د ژبې د ودې پوهه 🧩</p>
        <p>ماشومان ژبه د تعامل، نقل او لوبې له لارې زده کوي. فعال ګډون د کلماتو او جملو پوهنه او پوهه قوي کوي.</p>

        <p className="font-semibold">مهمې ستراتیژۍ</p>
        <ul className="space-y-2">
          {[
            "دوطرفه خبرې اترې: ماشوم ته د خبرو هڅونه",
            "په لوړ غږ لوستل: ګډ کتاب لوستل د لغتونو پوهنه زیاتوي",
            "قصه ویل او رول لوبول: د کیسې ویلو او خلاقیت مهارتونه وده کوي"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">علمي لید 🔬</p>
        <p>مغزي عکس العمل ښيي چې د کلماتو او غږونو سره تکراري مخامخ کیدل د ژبې پروسس ساحې قوي کوي. د دویمې ژبې مخکینی تجربه فکري انعطاف زیاتوي.</p>

        <p className="font-semibold">عملي ټکي 🎯</p>
        <ul className="space-y-2">
          {[
            "د فلش کارتونو کارول د غږ او عکسونو سره",
            "ماشومانو ته د کلماتو په لوړ غږ تکرار هڅونه",
            "د سندرو او شعرونو معرفي د لغتونو زیاتولو لپاره"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">کورني زده کړه 🏠</p>
        <ul className="space-y-2">
          {[
            "په کور کې د شیانو نښانونه",
            "د ورځنیو فعالیتونو تشریح",
            "که امکان ولري دوه ژبنی تجربه وړاندې کول"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">پرمختګ څارنه 📚</p>
        <p>نوي لغاتونه، د جملو پیچلتیا او د اړیکو تمایل تعقیب کړئ. د بریا جشن د باور زیاتوالي سبب کیږي.</p>

        <p className="font-semibold">راتلونکی 🚀</p>
        <p>د ژبې تطبیقي او تعاملي اپلیکیشنونه د شخصي ملاتړ سره د لغتونو او تلفظ تکمیل کوي.</p>

        <p className="font-semibold">مهم ټکي 🎯</p>
        <p>د ژبې ملاتړ په لومړیو پړاوونو کې د سواد، زده کړې او ټولنیزو مهارتونو لپاره قوي بنسټ جوړوي. ګډون، تکرار او ساتیري فعالیتونه غوره پایلې راوړي.</p>
      </div>
    )
  },

  // مقاله ۲
  {
    id: 2,
    title: "🔢 د لوبې له لارې د لومړنیو ریاضي مهارتونه",
    date: "۱۰ مارچ ۲۰۲۵",
    readingTime: "۱۰ دقیقې",
    author: "د ماشومانو د زده کړې مرکز تعلیمي ټیم",
    summary: "د لوبو له لارې د ریاضي زده کړه ماشومان د عددي مفاهیمو او مسئلو حل کولو سره په عملي او جذاب ډول اشنا کوي",
    content: (
      <div className="rtl text-right text-lg text-white/95 leading-[1.8] space-y-4">
        <p>د ماشومانو د لومړنیو ریاضي مهارتونو وده د مسئلو حل، منطق او انتقادي فکر لپاره چمتو کوي. د لوبې پر بنسټ زده کړه انتزاعي مفاهیم ملموس او جذاب کوي.</p>

        <p className="font-semibold">د ریاضي زده کړې پوهه 🧠</p>
        <p>ماشومان د عددي تجربو له لارې شکلونه، ترتیبونه او فضايي فکر زده کوي. د ریاضي لوبې د ازموینې، فرضیه څیړنې او کشف لپاره لار هواروي.</p>

        <p className="font-semibold">مهم عناصر</p>
        <ul className="space-y-2">
          {[
            "شمیرنه او مقدار: د مقدار پیژندنه",
            "شکلونه او فضايي پوهه: د شکلونو او فضايي اړیکو پوهه",
            "ترتیب او الګو: د الګو پیژندنه او وړاندوینه",
            "د اندازې مفاهیم: اوږدوالی، وزن او پرتله کول"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">عملي فعالیتونه 🎯</p>
        <ul className="space-y-2">
          {[
            "د حقیقي شیانو سره د شمېرنې لوبې",
            "د شکلونو پزلونه او ترتیب",
            "د بلاکونو یا مرچو سره الګو جوړول",
            "تعاملي قصصي مسئلې"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">علمي لید 🔬</p>
        <p>عملي ریاضي فعالیت د دماغ قشر فعالوي او د اجرایي فعالیت او عددي استدلال وړتیا لوړوي.</p>

        <p className="font-semibold">کورنی ملاتړ 🏠</p>
        <ul className="space-y-2">
          {[
            "اعداد د ورځنیو فعالیتونو سره یوځای کول (لکه د زینو شمېرنه)",
            "د پخلي یا اندازې اخیستنې له لارې د ریاضي کارول",
            "د ترتیب، ډلې بندي او ترتیب ورکولو هڅونه"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">ډیجیټل وسیلې 📱</p>
        <p>د عمر سره مناسب اپلیکیشنونه وکاروئ چې پرمختللي ننګونې او فوري فیډبک ولري.</p>

        <p className="font-semibold">راتلونکی 🚀</p>
        <p>د ریاضي لوبې او تطبیقي زده کړه شخصي تجربه وړاندې کوي.</p>

        <p className="font-semibold">مهم ټکي 🎯</p>
        <p>لومړني ریاضي مهارتونه باور، منطقي فکر او مسئلو حل کولو وړتیا پیاوړې کوي. تعاملي او ساتیري تجربې اوږدمهاله بریالیتوب تضمینوي.</p>
      </div>
    )
  },

  // مقاله ۳
  {
    id: 3,
    title: "📱 د ماشوم لپاره د سکرین وخت لارښود",
    date: "۵ اپریل ۲۰۲۵",
    readingTime: "۷ دقیقې",
    author: "د ماشومانو د زده کړې مرکز تعلیمي ټیم",
    summary: "لارښود د ماشوم سکرین وخت مدیریت او د ټیکنالوژۍ متوازن استعمال لپاره د سالمې ودې ملاتړ کوي",
    content: (
      <div className="rtl text-right text-lg text-white/95 leading-[1.8] space-y-4">
        <p>ډیجیټل ټیکنالوژي د عصري ژوند یوه مهمه برخه ده، خو د سکرین متوازن استعمال د سالمې ودې لپاره اړین دی.</p>

        <p className="font-semibold">د سکرین وخت پوهه 🧩</p>
        <p>کیفیت، محتوا او وخت د مطلق وخت په پرتله ډیر اهمیت لري. تعاملي او تعلیمي محتوا ګټور دی او غیر فعاله کارونه د ودې مخه نیسي.</p>

        <p className="font-semibold">سپارښتنې</p>
        <ul className="space-y-2">
          {[
            "ماشومان تر ۲ کلنۍ: لږ تر لږه سکرین استعمال",
            "۲-۵ کلنۍ: اعظمي ۱ ساعت په ورځ کې د تعلیمي محتوا سره",
            "۶ کلنۍ او پورته: د والدینو نظارت سره متوازن استعمال"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">ستراتیژۍ 🎯</p>
        <ul className="space-y-2">
          {[
            "تعاملي زده کړې اپلیکیشنونه",
            "ګډون او تعلیمي ویډیوګانې",
            "کورنۍ څارنه او بحث"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">کورني ادغام 🏠</p>
        <ul className="space-y-2">
          {[
            "محدود او منظمه وخت ټاکل",
            "بې ټیکنالوژۍ سیمې جوړول",
            "د بهرني او فزیکي لوبو هڅونه",
            "د ډیجیټل او عملي فعالیتونو ترکیب"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">علمي لید 🔬</p>
        <p>ډیر غیر فعاله سکرین وخت د توجه او خوب ستونزې رامنځته کوي. تعاملي تعلیمي محتوا د فکري ودې او خلاقیت ملاتړ کوي.</p>

        <p className="font-semibold">راتلونکی 🚀</p>
        <p>د مصنوعي هوښیارۍ پر بنسټ زده کړې وسایل د ماشوم سرعت ته سمون ورکوي او شخصي تجربه وړاندې کوي.</p>

        <p className="font-semibold">مهم ټکي 🎯</p>
        <p>متوازن او هدفمند سکرین وخت زده کړه تقویه کوي. د محتوا کیفیت، تعامل او د حقیقي تجربې ادغام مهم دي.</p>
      </div>
    )
  },

  // مقاله ۴
  {
    id: 4,
    title: "🏡 د زده کړې مناسب چاپیریال رامینځته کول",
    date: "۱۲ می ۲۰۲۵",
    readingTime: "۹ دقیقې",
    author: "د ماشومانو د زده کړې مرکز تعلیمي ټیم",
    summary: "یو تعاملي او ملاتړ کوونکی چاپیریال د ماشومانو هڅونه، کنجکاوي او تحصیلي بریا زیاتوي",
    content: (
      <div className="rtl text-right text-lg text-white/95 leading-[1.8] space-y-4">
        <p>یو ملاتړ کوونکی چاپیریال د ماشومانو کنجکاوي، ګډون او بریا لوړوي.</p>

        <p className="font-semibold">د چاپیریال اغیز پوهه 🧠</p>
        <p>ماشومان په خوندي، محرک، منظم او بې خنډه فضا کې وده کوي. لیدلوري نښانونه، لمسیدونکي مواد او د لاسرسي منابع زده کړه قوي کوي.</p>

        <p className="font-semibold">مهمې ځانګړتیاوې</p>
        <ul className="space-y-2">
          {[
            "خاموش او روښانه د زده کړې ځایونه",
            "منظم مواد د خپلواک سپړنې لپاره",
            "د زده کړې مرکزونه: مطالعه، هنر، علوم، جوړول"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">عملي لارې 🎯</p>
        <ul className="space-y-2">
          {[
            "د موادو دوران د علاقې د ساتلو لپاره",
            "د رنګ کوډ لرونکو نښانو کارول",
            "چندحسي عناصر اضافه کول: بڼه، غږ، عکسونه"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">کورني فعالیتونه 🏠</p>
        <ul className="space-y-2">
          {[
            "تعاملي مطالعې کونجونه",
            "کورني ساینسي تجربې",
            "خلاق هنري پروژې",
            "جوړونې ننګونې"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">علمي لید 🔬</p>
        <p>غني چاپیریال عصبي لارې قوي کوي، توجه زیاتوي او فکري انعطاف ښه کوي.</p>

        <p className="font-semibold">راتلونکی 🚀</p>
        <p>هوښیار چاپیریالونه د رڼا، غږ او تعاملي موادو سره شخصي زده کړې ته وده ورکوي.</p>

        <p className="font-semibold">مهم ټکي 🎯</p>
        <p>هدفمند چاپیریال ډیزاین هڅونه، سپړنه او مهارتونو وده زیاتوي. والدین د زده کړې په بریا کې مهم رول لري.</p>
      </div>
    )
  },

  // مقاله ۵
  {
    id: 5,
    title: "🎨 هنر او خلاقیت د ماشوم ودې کې",
    date: "۲۰ می ۲۰۲۵",
    readingTime: "۸ دقیقې",
    author: "د ماشومانو د زده کړې مرکز تعلیمي ټیم",
    summary: "خلاقیت او هنر د ستونزو حل، انتقادي فکر او احساس څرګندونې مهارتونه وده ورکوي",
    content: (
      <div className="rtl text-right text-lg text-white/95 leading-[1.8] space-y-4">
        <p>هنري فعالیتونه ماشومانو ته اجازه ورکوي چې خپل احساسات څرګند کړي، دقیقې حرکي مهارتونه قوي کړي او خلاقیت وده ورکړي.</p>

        <p className="font-semibold">د هنر ګټې 🖌️</p>
        <ul className="space-y-2">
          {[
            "تخیل او خلاقیت وده",
            "د لاس او سترګو هماهنګي پراختیا",
            "د ستونزو حل مهارتونه وده",
            "احساس څرګندول او مدیریت"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">عملي فعالیتونه 🎯</p>
        <ul className="space-y-2">
          {[
            "نقاشي او رنګونه",
            "خړوبیدل او جوړول",
            "موسیقي او رقص",
            "تعاملي ډرامې او رول لوبول"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">علمي لید 🔬</p>
        <p>هنري فعالیت دماغي فعالیت، د عاطفي مرکزونو فعاله کول او د خلاق حل لارې وده هڅوي.</p>

        <p className="font-semibold">راتلونکی 🚀</p>
        <p>د خلاق هنر او ټیکنالوژۍ ګډ فعالیتونه د ماشوم ځانګړي وړتیاوې لوړوي.</p>
      </div>
    )
  },

  // مقاله ۶
  {
    id: 6,
    title: "🌿 طبیعت سره اړیکه او ماشوم",
    date: "۱۵ جون ۲۰۲۵",
    readingTime: "۷ دقیقې",
    author: "د ماشومانو د زده کړې مرکز تعلیمي ټیم",
    summary: "د طبیعت سره وخت تېرول د ماشوم فکري، عاطفي او ټولنیز مهارتونه پیاوړي کوي",
    content: (
      <div className="rtl text-right text-lg text-white/95 leading-[1.8] space-y-4">
        <p>د طبیعت سپړنه ماشومانو ته فرصت ورکوي چې ځان پوه کړي، حواس فعال کړي او د ستونزو حل کولو مهارتونه زده کړي.</p>

        <p className="font-semibold">ګټې 🏞️</p>
        <ul className="space-y-2">
          {[
            "فزیکي فعالیتونه",
            "د حواس تمرین: لید، لمس، بوی، اوریدل",
            "ټولنیز مهارتونه: ګډې لوبې او همکاری",
            "د چاپیریال ساتنې پوهه"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="font-semibold">عملي لارې 🎯</p>
        <ul className="space-y-2">
          {[
            "باغباني او تخم کرل",
            "د طبیعت پیژندنې لوبې",
            "سپړنې او کیمپینګ فعالیتونه",
            "د څارویو او بوټو مشاهدي"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },

  // مقاله ۷
  {
    id: 7,
    title: "📖 د سواد زده کړې لارښوونې",
    date: "۲۷ جولای ۲۰۲۵",
    readingTime: "۸ دقیقې",
    author: "د ماشومانو د زده کړې مرکز تعلیمي ټیم",
    summary: "د سواد مهارتونه د ژبې پوهه، تمرکز او فکري مهارتونو وده تضمینوي",
    content: (
      <div className="rtl text-right text-lg text-white/95 leading-[1.8] space-y-4">
        <p>لومړني سواد مهارتونه د ژبې زده کړې بنسټ جوړوي او د تحصیلي بریا لپاره اړین دي.</p>

        <p className="font-semibold">مهم ټکي 📚</p>
        <ul className="space-y-2">
          {[
            "د حروفو او غږونو پیژندنه",
            "لوستل او تکرار",
            "قصه ویل او خلاقه لیکنه",
            "د لغتونو پراختیا"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },

  // مقاله ۸
  {
    id: 8,
    title: "🤹‍♂️ لوبې او ټولنیز مهارتونه",
    date: "۱۰ اګست ۲۰۲۵",
    readingTime: "۹ دقیقې",
    author: "د ماشومانو د زده کړې مرکز تعلیمي ټیم",
    summary: "د لوبو له لارې د ټولنیزو مهارتونو زده کړه د ماشوم اعتماد او اړیکې قوي کوي",
    content: (
      <div className="rtl text-right text-lg text-white/95 leading-[1.8] space-y-4">
        <p>لوبې د ماشوم ټولنیز مهارتونه، همکاري، اعتماد او د ستونزو حل کولو وړتیا پیاوړي کوي.</p>

        <p className="font-semibold">مهم فعالیتونه 🎯</p>
        <ul className="space-y-2">
          {[
            "ډلې لوبې او ګډې پروژې",
            "تبادله او شریکول",
            "د رول لوبې او کیسې ویلو فعالیتونه",
            "د ستونزو حل کولو ننګونې"
          ].map((text, idx) => (
            <li key={idx} className="relative pr-8">
              <span className="absolute right-0">{toPashtoNumber(idx + 1)}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
];
