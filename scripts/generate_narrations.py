import os
import asyncio
import edge_tts

NARRATIONS = [
    {
        "id": "narration-welcome",
        "text": "Yeay, teman-teman! Selamat datang di Safari Hewan! Hari ini kita akan bertemu teman-teman hewan yang seru, mendengarkan suaranya yang unik, dan bergerak gembira bersama. Sudah siap berpetualang? Yuk, kita mulai!",
        "rate": "-4%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene1-gateway",
        "text": "Halo sahabat kecil! Selamat datang di Gerbang Safari Hewan. Hari ini kita akan menjelajah alam bebas, mendengar suara hewan yang unik, dan bergerak gembira bersama. Ayo kita mulai petualangan kita!",
        "rate": "-4%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene2-elephant",
        "text": "Wah, lihat siapa yang datang! Ini adalah gajah. Gajah berbadan besar sekali! Coba perhatikan, gajah memiliki belalai yang panjang dan telinga yang sangat lebar. Ayo, coba sentuh belalai atau telinganya!",
        "rate": "-4%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene2-trunk",
        "text": "Pintar sekali! Itu belalai gajah yang panjang. Gajah menggunakan belalainya untuk minum air dan mengambil makanan.",
        "rate": "-3%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene2-ears",
        "text": "Hebat! Itu telinga gajah yang lebar. Telinganya berguna untuk mendengar suara dari jauh dan mengipasi tubuhnya agar tetap sejuk.",
        "rate": "-3%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene3-guess-sound",
        "text": "Sekarang waktunya bermain tebak suara! Pasang telingamu dan dengarkan baik-baik ya. Suara hewan apakah ini? Pikirkan dulu, lalu sentuh hewan yang tepat!",
        "rate": "-4%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene3-correct",
        "text": "Hebat sekali! Pilihanmu tepat! Itu adalah suara bebek: kwek... kwek... kwek! Bebek suka sekali berenang riang di danau.",
        "rate": "-3%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene4-intro",
        "text": "Ayo teman-teman, semuanya berdiri! Sekarang saatnya kita bergerak menirukan gaya hewan-hewan safari yang lincah!",
        "rate": "-3%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene4-rabbit",
        "text": "Ayo berdiri dan tekuk lututmu sedikit! Taruh tangan di atas kepala seperti telinga kelinci yang panjang. Sekarang, melompat kecil ke depan: Hop! Hop! Hop! Wah, lincah sekali!",
        "rate": "-3%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene4-elephant",
        "text": "Ayo berjalan tegap seperti gajah besar! Buka kakimu selebar bahu, ayunkan tanganmu ke depan seperti belalai, lalu langkahkan kaki perlahan: Buuk... buuk... buuk! Gagah sekali!",
        "rate": "-3%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene4-bird",
        "text": "Sekarang rentangkan kedua tanganmu lebar-lebar ke samping seperti sayap burung yang cantik. Kepakkan perlahan ke atas dan ke bawah, melayang bebas di langit: Kepak... kepak... kepak! Indah sekali!",
        "rate": "-3%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene5-match",
        "text": "Sekarang buka buku catatan safarimu! Perhatikan gambar hewan di sebelah kiri, lalu sentuh balok nama yang cocok di sebelah kanan. Ayo pasangkan!",
        "rate": "-4%",
        "pitch": "+2Hz"
    },
    {
        "id": "narration-scene6-favorite",
        "text": "Yeay! Kamu sudah menyelesaikan seluruh petualangan safari hari ini dengan sangat hebat! Sekarang, sentuh hewan yang paling kamu sayangi, lalu ceritakan kepada guru atau temanmu ya!",
        "rate": "-4%",
        "pitch": "+2Hz"
    }
]

async def main():
    out_dir = os.path.join("public", "audio", "narration")
    os.makedirs(out_dir, exist_ok=True)
    voice = "id-ID-GadisNeural"

    print(f"Starting narration generation with {voice}...")
    for item in NARRATIONS:
        out_file = os.path.join(out_dir, f"{item['id']}.mp3")
        print(f"Generating: {item['id']}...")
        communicate = edge_tts.Communicate(
            text=item["text"],
            voice=voice,
            rate=item["rate"],
            pitch=item["pitch"]
        )
        await communicate.save(out_file)
        print(f"Saved: {out_file} ({os.path.getsize(out_file)} bytes)")

    print("All narrations generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
