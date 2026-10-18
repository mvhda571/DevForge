const DEG = ['Bakalavr', 'Magistratura', 'Doktorantura'];

const SCH = {
  uzGrant: { name: 'Davlat granti', description: 'Davlat oliy ta’lim muassasalarida kirish imtihonlari natijalari asosida tanlov orqali beriladi. Kvota va shartlar har yili e’lon qilinadi — rasmiy manbalardan tekshiring.', url: 'https://uzbmb.uz', verified: false },
  gks: { name: 'Global Korea Scholarship (GKS)', description: 'Koreya hukumatining xalqaro talabalar uchun stipendiya dasturi. Ushbu universitetda qatnashishi va shartlari har yili o‘zgaradi — rasmiy saytdan tekshiring.', url: 'https://www.studyinkorea.go.kr', verified: false },
  csc: { name: 'Xitoy hukumati stipendiyasi (CSC)', description: 'Xitoy hukumatining xalqaro talabalar uchun stipendiya dasturi. Universitet ishtiroki va shartlarini rasmiy saytdan tekshiring.', url: 'https://www.campuschina.org', verified: false },
  daad: { name: 'DAAD stipendiyalari', description: 'Germaniya akademik almashinuv xizmatining stipendiya dasturlari. Mos dasturlar va muddatlarni rasmiy saytdan tekshiring.', url: 'https://www.daad.de', verified: false },
  turkiye: { name: 'Türkiye Bursları', description: 'Turkiya hukumatining xalqaro talabalar uchun stipendiya dasturi. Universitet va yo‘nalish bo‘yicha shartlarni rasmiy saytdan tekshiring.', url: 'https://www.turkiyeburslari.gov.tr', verified: false }
};

const u = (slug, name, localName, country, city, website, type, fields, languages, lat, lng, scholarships = [], description = '') => ({
  slug,
  name,
  localName,
  country,
  city,
  website,
  type,
  fields,
  languages,
  degreeLevels: DEG,
  description,
  scholarships,
  location: { lat, lng, approximate: true },
  dataStatus: 'demo',
  lastVerifiedAt: null
});

export default [
  u('nuuz', 'O‘zbekiston Milliy universiteti', 'Mirzo Ulug‘bek nomidagi O‘zbekiston Milliy universiteti', 'O‘zbekiston', 'Toshkent', 'https://nuu.uz', 'public', ['Tabiiy fanlar', 'Matematika', 'Kompyuter fanlari', 'Iqtisodiyot va biznes', 'Huquq', 'Gumanitar fanlar'], ['O‘zbek', 'Rus'], 41.3497, 69.2047, [SCH.uzGrant], 'Mamlakatdagi eng yirik klassik universitetlardan biri.'),
  u('tuit', 'Toshkent axborot texnologiyalari universiteti', 'Muhammad al-Xorazmiy nomidagi TATU', 'O‘zbekiston', 'Toshkent', 'https://tuit.uz', 'public', ['Kompyuter fanlari', 'Muhandislik'], ['O‘zbek', 'Rus'], 41.3409, 69.2867, [SCH.uzGrant], 'Axborot texnologiyalari va telekommunikatsiya sohasiga ixtisoslashgan universitet.'),
  u('wiut', 'Westminster International University in Tashkent', 'WIUT', 'O‘zbekiston', 'Toshkent', 'https://wiut.uz', 'private', ['Iqtisodiyot va biznes', 'Kompyuter fanlari', 'Huquq'], ['Ingliz'], 41.3006, 69.2717, [], 'Ingliz tilida ta’lim beruvchi xalqaro universitet.'),
  u('inha-tashkent', 'Inha University in Tashkent', 'IUT', 'O‘zbekiston', 'Toshkent', 'https://inha.uz', 'private', ['Kompyuter fanlari', 'Muhandislik', 'Iqtisodiyot va biznes'], ['Ingliz'], 41.3388, 69.3349, [], 'Koreyaning Inha universiteti bilan hamkorlikdagi universitet.'),
  u('tsue', 'Toshkent davlat iqtisodiyot universiteti', 'TDIU', 'O‘zbekiston', 'Toshkent', 'https://tsue.uz', 'public', ['Iqtisodiyot va biznes'], ['O‘zbek', 'Rus'], 41.3062, 69.2621, [SCH.uzGrant], 'Iqtisodiyot, moliya va boshqaruv yo‘nalishlariga ixtisoslashgan.'),
  u('tma', 'Toshkent tibbiyot akademiyasi', 'TTA', 'O‘zbekiston', 'Toshkent', 'https://tma.uz', 'public', ['Tibbiyot'], ['O‘zbek', 'Rus'], 41.3492, 69.2131, [SCH.uzGrant], 'Tibbiyot kadrlarini tayyorlovchi oliy ta’lim muassasasi.'),
  u('tstu', 'Toshkent davlat texnika universiteti', 'Islom Karimov nomidagi TDTU', 'O‘zbekiston', 'Toshkent', 'https://tdtu.uz', 'public', ['Muhandislik', 'Kompyuter fanlari'], ['O‘zbek', 'Rus'], 41.3415, 69.2066, [SCH.uzGrant], 'Muhandislik va texnika yo‘nalishlariga ixtisoslashgan universitet.'),
  u('samdu', 'Samarqand davlat universiteti', 'Sharof Rashidov nomidagi SamDU', 'O‘zbekiston', 'Samarqand', 'https://samdu.uz', 'public', ['Tabiiy fanlar', 'Matematika', 'Gumanitar fanlar', 'Iqtisodiyot va biznes', 'Huquq'], ['O‘zbek', 'Rus'], 39.6506, 66.9601, [SCH.uzGrant], 'Mintaqadagi yirik klassik universitet.'),

  u('kaist', 'KAIST', 'Korea Advanced Institute of Science and Technology', 'Janubiy Koreya', 'Tejon', 'https://www.kaist.ac.kr', 'public', ['Muhandislik', 'Kompyuter fanlari', 'Tabiiy fanlar', 'Matematika', 'Iqtisodiyot va biznes'], ['Koreys', 'Ingliz'], 36.3721, 127.3604, [SCH.gks], 'Fan va texnologiyaga ixtisoslashgan tadqiqot universiteti.'),
  u('snu', 'Seoul National University', '서울대학교', 'Janubiy Koreya', 'Seul', 'https://www.snu.ac.kr', 'public', ['Tabiiy fanlar', 'Muhandislik', 'Tibbiyot', 'Huquq', 'Iqtisodiyot va biznes', 'Gumanitar fanlar'], ['Koreys', 'Ingliz'], 37.4599, 126.9519, [SCH.gks], 'Koreyaning yetakchi milliy universiteti.'),
  u('yonsei', 'Yonsei University', '연세대학교', 'Janubiy Koreya', 'Seul', 'https://www.yonsei.ac.kr', 'private', ['Tibbiyot', 'Muhandislik', 'Iqtisodiyot va biznes', 'Gumanitar fanlar', 'Huquq'], ['Koreys', 'Ingliz'], 37.5658, 126.9386, [SCH.gks], 'Seuldagi yirik xususiy tadqiqot universiteti.'),
  u('korea-university', 'Korea University', '고려대학교', 'Janubiy Koreya', 'Seul', 'https://www.korea.edu', 'private', ['Iqtisodiyot va biznes', 'Huquq', 'Muhandislik', 'Tibbiyot', 'Gumanitar fanlar'], ['Koreys', 'Ingliz'], 37.5894, 127.0323, [SCH.gks], 'Seuldagi yirik xususiy universitet.'),

  u('tsinghua', 'Tsinghua University', '清华大学', 'Xitoy', 'Pekin', 'https://www.tsinghua.edu.cn', 'public', ['Muhandislik', 'Kompyuter fanlari', 'Arxitektura va dizayn', 'Iqtisodiyot va biznes', 'Tabiiy fanlar'], ['Xitoy', 'Ingliz'], 40.0003, 116.3264, [SCH.csc], 'Muhandislik va texnika sohasida mashhur tadqiqot universiteti.'),
  u('pku', 'Peking University', '北京大学', 'Xitoy', 'Pekin', 'https://www.pku.edu.cn', 'public', ['Tabiiy fanlar', 'Gumanitar fanlar', 'Iqtisodiyot va biznes', 'Tibbiyot', 'Huquq'], ['Xitoy', 'Ingliz'], 39.9869, 116.3059, [SCH.csc], 'Xitoyning eng qadimiy va yirik universitetlaridan biri.'),
  u('zju', 'Zhejiang University', '浙江大学', 'Xitoy', 'Xanchjou', 'https://www.zju.edu.cn', 'public', ['Muhandislik', 'Kompyuter fanlari', 'Tibbiyot', 'Tabiiy fanlar', 'Iqtisodiyot va biznes'], ['Xitoy', 'Ingliz'], 30.3080, 120.0860, [SCH.csc], 'Keng yo‘nalishli yirik tadqiqot universiteti.'),
  u('fudan', 'Fudan University', '复旦大学', 'Xitoy', 'Shanxay', 'https://www.fudan.edu.cn', 'public', ['Tibbiyot', 'Iqtisodiyot va biznes', 'Tabiiy fanlar', 'Gumanitar fanlar'], ['Xitoy', 'Ingliz'], 31.2990, 121.5000, [SCH.csc], 'Shanxaydagi yetakchi tadqiqot universiteti.'),

  u('tum', 'Technische Universität München', 'TUM', 'Germaniya', 'Myunxen', 'https://www.tum.de', 'public', ['Muhandislik', 'Kompyuter fanlari', 'Tabiiy fanlar', 'Tibbiyot', 'Arxitektura va dizayn', 'Iqtisodiyot va biznes'], ['Nemis', 'Ingliz'], 48.1497, 11.5679, [SCH.daad], 'Texnika va tabiiy fanlar bo‘yicha yetakchi universitet.'),
  u('rwth', 'RWTH Aachen University', 'Rheinisch-Westfälische Technische Hochschule Aachen', 'Germaniya', 'Axen', 'https://www.rwth-aachen.de', 'public', ['Muhandislik', 'Kompyuter fanlari', 'Arxitektura va dizayn', 'Tabiiy fanlar', 'Tibbiyot'], ['Nemis', 'Ingliz'], 50.7779, 6.0778, [SCH.daad], 'Muhandislik ta’limi bilan mashhur texnika universiteti.'),
  u('hu-berlin', 'Humboldt-Universität zu Berlin', 'HU Berlin', 'Germaniya', 'Berlin', 'https://www.hu-berlin.de', 'public', ['Gumanitar fanlar', 'Huquq', 'Tabiiy fanlar', 'Iqtisodiyot va biznes', 'Pedagogika'], ['Nemis', 'Ingliz'], 52.5180, 13.3934, [SCH.daad], 'Berlindagi tarixiy klassik universitet.'),
  u('heidelberg', 'Heidelberg University', 'Ruprecht-Karls-Universität Heidelberg', 'Germaniya', 'Geydelberg', 'https://www.uni-heidelberg.de', 'public', ['Tibbiyot', 'Tabiiy fanlar', 'Huquq', 'Gumanitar fanlar', 'Matematika'], ['Nemis', 'Ingliz'], 49.4106, 8.7066, [SCH.daad], 'Germaniyaning eng qadimiy universiteti.'),

  u('metu', 'Middle East Technical University', 'Orta Doğu Teknik Üniversitesi (ODTÜ)', 'Turkiya', 'Anqara', 'https://www.metu.edu.tr', 'public', ['Muhandislik', 'Kompyuter fanlari', 'Arxitektura va dizayn', 'Iqtisodiyot va biznes', 'Tabiiy fanlar'], ['Ingliz'], 39.8915, 32.7837, [SCH.turkiye], 'Ingliz tilida ta’lim beruvchi texnika universiteti.'),
  u('bogazici', 'Boğaziçi University', 'Boğaziçi Üniversitesi', 'Turkiya', 'Istanbul', 'https://bogazici.edu.tr', 'public', ['Muhandislik', 'Kompyuter fanlari', 'Iqtisodiyot va biznes', 'Pedagogika', 'Gumanitar fanlar'], ['Ingliz'], 41.0838, 29.0507, [SCH.turkiye], 'Istanbuldagi yetakchi davlat universiteti.'),
  u('itu', 'Istanbul Technical University', 'İstanbul Teknik Üniversitesi (İTÜ)', 'Turkiya', 'Istanbul', 'https://www.itu.edu.tr', 'public', ['Muhandislik', 'Arxitektura va dizayn', 'Kompyuter fanlari'], ['Turk', 'Ingliz'], 41.1055, 29.0250, [SCH.turkiye], 'Muhandislik va arxitektura bo‘yicha tarixiy universitet.'),
  u('sabanci', 'Sabancı University', 'Sabancı Üniversitesi', 'Turkiya', 'Istanbul', 'https://www.sabanciuniv.edu', 'private', ['Muhandislik', 'Kompyuter fanlari', 'Iqtisodiyot va biznes'], ['Ingliz'], 40.8913, 29.3787, [], 'Istanbuldagi xususiy tadqiqot universiteti.'),

  u('mit', 'Massachusetts Institute of Technology', 'MIT', 'AQSH', 'Kembrij', 'https://www.mit.edu', 'private', ['Muhandislik', 'Kompyuter fanlari', 'Tabiiy fanlar', 'Arxitektura va dizayn', 'Iqtisodiyot va biznes', 'Matematika'], ['Ingliz'], 42.3601, -71.0942, [], 'Fan va texnologiya bo‘yicha dunyoga mashhur tadqiqot universiteti.'),
  u('stanford', 'Stanford University', 'Stanford', 'AQSH', 'Stenford', 'https://www.stanford.edu', 'private', ['Kompyuter fanlari', 'Muhandislik', 'Tibbiyot', 'Huquq', 'Iqtisodiyot va biznes', 'Gumanitar fanlar'], ['Ingliz'], 37.4275, -122.1697, [], 'Kaliforniyadagi yirik xususiy tadqiqot universiteti.'),
  u('uc-berkeley', 'University of California, Berkeley', 'UC Berkeley', 'AQSH', 'Berkli', 'https://www.berkeley.edu', 'public', ['Kompyuter fanlari', 'Muhandislik', 'Tabiiy fanlar', 'Huquq', 'Iqtisodiyot va biznes', 'Gumanitar fanlar'], ['Ingliz'], 37.8719, -122.2585, [], 'Kaliforniya universitetlar tizimining davlat universiteti.'),
  u('asu', 'Arizona State University', 'ASU', 'AQSH', 'Tempe', 'https://www.asu.edu', 'public', ['Muhandislik', 'Kompyuter fanlari', 'Iqtisodiyot va biznes', 'Pedagogika', 'Tabiiy fanlar', 'Arxitektura va dizayn'], ['Ingliz'], 33.4242, -111.9281, [], 'Arizonadagi yirik davlat universiteti.')
];
