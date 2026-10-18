import { useDocumentTitle } from '../hooks/useApi.js';

const SECTIONS = [
  { h: 'Qanday ma’lumot to‘playmiz', p: ['Hisob ma’lumotlari: ism, email, rol va ixtiyoriy tug‘ilgan yil.', 'O‘quv ma’lumotlari: anketa javoblari, kasb testi javoblari, tugatilgan darslar, test natijalari, eslatmalar va saqlangan elementlar.', 'AI suhbatlari: AI ustoz va maslahatchi bilan yozishmalaringiz — ular faqat sizga ko‘rinadi.'] },
  { h: 'Ma’lumotdan qanday foydalanamiz', p: ['Shaxsiy yo‘l xaritasi, tavsiyalar va progressni ko‘rsatish uchun.', 'AI javoblarini shaxsiylashtirish uchun (faqat sizning ma’lumotlaringiz, faqat sizning suhbatingizda).', 'Ma’lumotlaringizni sotmaymiz va reklama maqsadida uchinchi tomonlarga bermaymiz.'] },
  { h: 'Kim nimani ko‘radi', p: ['O‘qituvchi: faqat siz qo‘shilgan guruh doirasida progress, test natijalari va topshiriqlaringiz.', 'Ota-ona: faqat siz bog‘lanishni tasdiqlaganingizdan keyin — o‘quv progressi, test xulosalari va muddatlar. AI suhbatlari va shaxsiy eslatmalar ko‘rsatilmaydi. Bog‘lanishni istalgan vaqtda bekor qilishingiz mumkin.', 'Administrator: platformani boshqarish uchun zarur bo‘lgan hisob ma’lumotlari. Muhim amallar audit jurnaliga yoziladi.'] },
  { h: 'Voyaga yetmaganlar', p: ['18 yoshgacha bo‘lgan foydalanuvchilar platformadan ota-ona yoki vasiy roziligi bilan foydalanishi tavsiya etiladi. Biz ortiqcha shaxsiy ma’lumot so‘ramaymiz: tug‘ilgan yil ixtiyoriy, manzil yoki telefon raqami talab qilinmaydi.'] },
  { h: 'Sizning huquqlaringiz', p: ['Sozlamalar sahifasida barcha ma’lumotlaringizni JSON faylda yuklab olishingiz mumkin.', 'Hisobingizni va unga bog‘liq barcha ma’lumotlarni butunlay o‘chirishingiz mumkin. Bu amalni qaytarib bo‘lmaydi.', 'AI suhbatlarini alohida o‘chirish imkoniyati bor.'] },
  { h: 'Xavfsizlik', p: ['Parollar bcrypt algoritmi bilan xeshlangan holda saqlanadi. Sessiya himoyalangan cookie orqali boshqariladi, so‘rovlar CSRF va so‘rovlar chastotasi cheklovi bilan himoyalangan.'] }
];

export default function Privacy() {
  useDocumentTitle('Maxfiylik siyosati');
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="page-title">Maxfiylik siyosati va foydalanish shartlari</h1>
      <p className="mt-3 text-muted">Ushbu sahifa DevForge qanday ma’lumot to‘plashi va undan qanday foydalanishini oddiy tilda tushuntiradi.</p>
      {SECTIONS.map((s) => (
        <section key={s.h} className="mt-10">
          <h2 className="text-lg text-ink">{s.h}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-ink/90">
            {s.p.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </section>
      ))}
      <section id="shartlar" className="mt-10 scroll-mt-24">
        <h2 className="text-lg text-ink">Foydalanish shartlari</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-ink/90">
          <li>Kasb testi natijalari taxminiy va tavsiyaviy xarakterga ega; ular psixologik tashxis emas.</li>
          <li>Tibbiyotga oid darslar tanishtiruv xarakterida bo‘lib, professional tibbiy ta’lim yoki maslahat o‘rnini bosmaydi.</li>
          <li>Universitetlar haqidagi ma’lumotlar o‘zgarishi mumkin. Har doim rasmiy manbalardan tekshiring.</li>
          <li>Boshqa foydalanuvchilarni hurmat qiling va platformadan qonunga zid maqsadlarda foydalanmang.</li>
        </ul>
      </section>
      <p className="mt-10 text-sm text-muted">Savollar bo‘yicha: <a href="mailto:hello@devforge.uz" className="text-primary-ink hover:underline">hello@devforge.uz</a></p>
    </article>
  );
}
