// Project Sleep - Main JavaScript
class ProjectSleep {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.currentLang = localStorage.getItem('language') || 'en';
        this.particleApp = null;
        this.particles = [];
        
        this.init();
    }
    
    init() {
        this.setupTheme();
        this.setupLanguage();
        this.setupNavigation();
        this.setupAnimations();
        this.setupParticleSystem();
        this.setupScrollAnimations();
        this.setupCounters();
        this.setupEventListeners();
        
        // Initialize page-specific features
        if (document.getElementById('heroSubtitle')) {
            this.setupHeroTypewriter();
        }
    }
    
    // Theme Management
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
        
        // Animate theme change
        anime({
            targets: 'body',
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    updateThemeIcon() {
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    // Language System
    setupLanguage() {
        this.translations = {
            en: {
                'nav.home': 'Home',
                'nav.features': 'Features',
                'nav.download': 'Download',
                'nav.community': 'Community',
                'nav.about': 'About',
                'hero.download': 'Download SleepOS',
                'hero.explore': 'Explore Features',
                'stats.users': 'Active Users',
                'stats.devices': 'Supported Devices',
                'stats.stability': 'Stability Score',
                'features.title': 'Core Features',
                'features.subtitle': 'Experience the next generation of Android customization with our cutting-edge features and optimizations.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'Custom ROM based on HyperOS with enhanced performance and battery optimization.',
                'features.aosp': 'AOSP Builds',
                'features.aosp.desc': 'Pure Android experience with latest AOSP sources and minimal bloatware.',
                'features.hyperos': 'HyperOS Mods',
                'features.hyperos.desc': 'Enhanced HyperOS with additional customization options and performance tweaks.',
                'features.performance': 'Performance',
                'features.performance.desc': 'Advanced kernel optimizations and system tweaks for maximum performance.',
                'features.learn': 'Learn More',
                'preview.title': 'SleepOS Interface',
                'preview.description': 'Experience a revolutionary interface that combines the best of HyperOS with advanced customization options, glassmorphism design elements, and performance optimizations that redefine your Android experience.',
                'preview.feature1': 'Glassmorphism UI Design',
                'preview.feature2': 'Advanced Customization',
                'preview.feature3': 'Performance Optimizations',
                'preview.feature4': 'Battery Enhancements',
                'preview.download': 'Try SleepOS Now',
                'community.title': 'Join Our Community',
                'community.description': 'Connect with thousands of developers and enthusiasts in our active community. Share ideas, get support, and contribute to the future of Project Sleep.',
                'community.discord': 'Discord Server',
                'community.discord.desc': 'Real-time chat with developers and get instant support.',
                'community.join': 'Join Discord',
                'community.telegram': 'Telegram Group',
                'community.telegram.desc': 'Stay updated with latest releases and announcements.',
                'community.visit': 'Join Telegram',
                'community.forum': 'Community Forum',
                'community.forum.desc': 'In-depth discussions and detailed guides.',
                'footer.description': 'Advanced custom ROM development for the future of Android.',
                'footer.privacy': 'Privacy Policy',
                'footer.terms': 'Terms of Service',
                'footer.contact': 'Contact Us',
                'footer.copyright': '© 2024 Project Sleep. All rights reserved.'
            },
            id: {
                'nav.home': 'Beranda',
                'nav.features': 'Fitur',
                'nav.download': 'Unduh',
                'nav.community': 'Komunitas',
                'nav.about': 'Tentang',
                'hero.download': 'Unduh SleepOS',
                'hero.explore': 'Jelajahi Fitur',
                'stats.users': 'Pengguna Aktif',
                'stats.devices': 'Perangkat Didukung',
                'stats.stability': 'Skor Stabilitas',
                'features.title': 'Fitur Utama',
                'features.subtitle': 'Rasakan generasi baru kustomisasi Android dengan fitur canggih dan optimasi kami.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'ROM kustom berbasis HyperOS dengan peningkatan performa dan optimasi baterai.',
                'features.aosp': 'Build AOSP',
                'features.aosp.desc': 'Pengalaman Android murni dengan sumber AOSP terbaru dan bebas bloatware.',
                'features.hyperos': 'Mod HyperOS',
                'features.hyperos.desc': 'HyperOS yang ditingkatkan dengan opsi kustomisasi tambahan dan tweak performa.',
                'features.performance': 'Performa',
                'features.performance.desc': 'Optimasi kernel canggih dan tweak sistem untuk performa maksimal.',
                'features.learn': 'Pelajari Lebih Lanjut',
                'preview.title': 'Antarmuka SleepOS',
                'preview.description': 'Rasakan antarmuka revolusioner yang menggabungkan yang terbaik dari HyperOS dengan opsi kustomisasi lanjutan, elemen desain glassmorphism, dan optimasi performa yang mendefinisikan ulang pengalaman Android Anda.',
                'preview.feature1': 'Desain UI Glassmorphism',
                'preview.feature2': 'Kustomisasi Lanjutan',
                'preview.feature3': 'Optimasi Performa',
                'preview.feature4': 'Peningkatan Baterai',
                'preview.download': 'Coba SleepOS Sekarang',
                'community.title': 'Bergabung dengan Komunitas Kami',
                'community.description': 'Terhubung dengan ribuan pengembang dan penggemar di komunitas aktif kami. Bagikan ide, dapatkan dukungan, dan berkontribusi pada masa depan Project Sleep.',
                'community.discord': 'Server Discord',
                'community.discord.desc': 'Obrolan real-time dengan pengembang dan dapatkan dukungan instan.',
                'community.join': 'Gabung Discord',
                'community.telegram': 'Grup Telegram',
                'community.telegram.desc': 'Tetap terupdate dengan rilis terbaru dan pengumuman.',
                'community.visit': 'Gabung Telegram',
                'community.forum': 'Forum Komunitas',
                'community.forum.desc': 'Diskusi mendalam dan panduan terperinci.',
                'footer.description': 'Pengembangan ROM kustom canggih untuk masa depan Android.',
                'footer.privacy': 'Kebijakan Privasi',
                'footer.terms': 'Ketentuan Layanan',
                'footer.contact': 'Hubungi Kami',
                'footer.copyright': '© 2024 Project Sleep. Hak cipta dilindungi.'
            },
            ru: {
                'nav.home': 'Главная',
                'nav.features': 'Функции',
                'nav.download': 'Скачать',
                'nav.community': 'Сообщество',
                'nav.about': 'О нас',
                'hero.download': 'Скачать SleepOS',
                'hero.explore': 'Исследовать функции',
                'stats.users': 'Активных пользователей',
                'stats.devices': 'Поддерживаемых устройств',
                'stats.stability': 'Оценка стабильности',
                'features.title': 'Основные функции',
                'features.subtitle': 'Испытайте новое поколение кастомизации Android с нашими передовыми функциями и оптимизациями.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'Кастомная ROM на основе HyperOS с улучшенной производительностью и оптимизацией батареи.',
                'features.aosp': 'AOSP сборки',
                'features.aosp.desc': 'Чистый опыт Android с последними источниками AOSP и минимальным количеством лишнего ПО.',
                'features.hyperos': 'HyperOS моды',
                'features.hyperos.desc': 'Улучшенный HyperOS с дополнительными опциями кастомизации и твиками производительности.',
                'features.performance': 'Производительность',
                'features.performance.desc': 'Передовые оптимизации ядра и системные твики для максимальной производительности.',
                'features.learn': 'Узнать больше',
                'preview.title': 'Интерфейс SleepOS',
                'preview.description': 'Испытайте революционный интерфейс, который сочетает лучшее из HyperOS с расширенными опциями кастомизации, элементами дизайна glassmorphism и оптимизациями производительности, которые переопределяют ваш опыт Android.',
                'preview.feature1': 'Glassmorphism UI дизайн',
                'preview.feature2': 'Расширенная кастомизация',
                'preview.feature3': 'Оптимизации производительности',
                'preview.feature4': 'Улучшения батареи',
                'preview.download': 'Попробовать SleepOS сейчас',
                'community.title': 'Присоединяйтесь к нашему сообществу',
                'community.description': 'Свяжитесь с тысячами разработчиков и энтузиастов в нашем активном сообществе. Делитесь идеями, получайте поддержку и вносите вклад в будущее Project Sleep.',
                'community.discord': 'Discord сервер',
                'community.discord.desc': 'Чат в реальном времени с разработчиками и мгновенная поддержка.',
                'community.join': 'Присоединиться к Discord',
                'community.telegram': 'Telegram группа',
                'community.telegram.desc': 'Будьте в курсе последних релизов и объявлений.',
                'community.visit': 'Присоединиться к Telegram',
                'community.forum': 'Форум сообщества',
                'community.forum.desc': 'Углубленные обсуждения и подробные руководства.',
                'footer.description': 'Передовая разработка кастомных ROM для будущего Android.',
                'footer.privacy': 'Политика конфиденциальности',
                'footer.terms': 'Условия использования',
                'footer.contact': 'Связаться с нами',
                'footer.copyright': '© 2024 Project Sleep. Все права защищены.'
            },
            zh: {
                'nav.home': '首页',
                'nav.features': '功能',
                'nav.download': '下载',
                'nav.community': '社区',
                'nav.about': '关于',
                'hero.download': '下载 SleepOS',
                'hero.explore': '探索功能',
                'stats.users': '活跃用户',
                'stats.devices': '支持设备',
                'stats.stability': '稳定性评分',
                'features.title': '核心功能',
                'features.subtitle': '体验下一代 Android 定制，享受我们的尖端功能和优化。',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': '基于 HyperOS 的自定义 ROM，具有增强的性能和电池优化。',
                'features.aosp': 'AOSP 构建',
                'features.aosp.desc': '纯粹的 Android 体验，使用最新的 AOSP 源代码和最少的臃肿软件。',
                'features.hyperos': 'HyperOS 模组',
                'features.hyperos.desc': '增强的 HyperOS，具有额外的自定义选项和性能调整。',
                'features.performance': '性能',
                'features.performance.desc': '先进的内核优化和系统调整，实现最大性能。',
                'features.learn': '了解更多',
                'preview.title': 'SleepOS 界面',
                'preview.description': '体验革命性的界面，它结合了 HyperOS 的最佳功能，具有高级自定义选项、玻璃拟态设计元素和性能优化，重新定义您的 Android 体验。',
                'preview.feature1': '玻璃拟态 UI 设计',
                'preview.feature2': '高级自定义',
                'preview.feature3': '性能优化',
                'preview.feature4': '电池增强',
                'preview.download': '立即试用 SleepOS',
                'community.title': '加入我们的社区',
                'community.description': '与数千名开发者和爱好者在我们活跃的社区中联系。分享想法，获得支持，并为 Project Sleep 的未来做出贡献。',
                'community.discord': 'Discord 服务器',
                'community.discord.desc': '与开发者实时聊天并获得即时支持。',
                'community.join': '加入 Discord',
                'community.telegram': 'Telegram 群组',
                'community.telegram.desc': '及时了解最新版本和公告。',
                'community.visit': '加入 Telegram',
                'community.forum': '社区论坛',
                'community.forum.desc': '深入讨论和详细指南。',
                'footer.description': '为 Android 的未来提供先进的自定义 ROM 开发。',
                'footer.privacy': '隐私政策',
                'footer.terms': '服务条款',
                'footer.contact': '联系我们',
                'footer.copyright': '© 2024 Project Sleep. 保留所有权利。'
            },
            hi: {
                'nav.home': 'होम',
                'nav.features': 'फीचर्स',
                'nav.download': 'डाउनलोड',
                'nav.community': 'समुदाय',
                'nav.about': 'हमारे बारे में',
                'hero.download': 'SleepOS डाउनलोड करें',
                'hero.explore': 'फीचर्स एक्सप्लोर करें',
                'stats.users': 'सक्रिय उपयोगकर्ता',
                'stats.devices': 'समर्थित उपकरण',
                'stats.stability': 'स्थिरता स्कोर',
                'features.title': 'मुख्य फीचर्स',
                'features.subtitle': 'हमारे अत्याधुनिक फीचर्स और अनुकूलन के साथ Android कस्टमाइजेशन की अगली पीढ़ी का अनुभव करें।',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'HyperOS आधारित कस्टम ROM जिसमें बेहतर प्रदर्शन और बैटरी अनुकूलन है।',
                'features.aosp': 'AOSP बिल्ड्स',
                'features.aosp.desc': 'नवीनतम AOSP स्रोतों और न्यूनतम bloatware के साथ शुद्ध Android अनुभव।',
                'features.hyperos': 'HyperOS मॉड्स',
                'features.hyperos.desc': 'अतिरिक्त कस्टमाइजेशन विकल्पों और प्रदर्शन ट्वीक्स के साथ उन्नत HyperOS।',
                'features.performance': 'प्रदर्शन',
                'features.performance.desc': 'अधिकतम प्रदर्शन के लिए उन्नत कर्नेल अनुकूलन और सिस्टम ट्वीक्स।',
                'features.learn': 'और जानें',
                'preview.title': 'SleepOS इंटरफेस',
                'preview.description': 'एक क्रांतिकारी इंटरफेस का अनुभव करें जो HyperOS की सर्वोत्तम विशेषताओं को उन्नत कस्टमाइजेशन विकल्पों, glassmorphism डिज़ाइन तत्वों और प्रदर्शन अनुकूलनों के साथ संयोजित करता है जो आपके Android अनुभव को पुनः परिभाषित करते हैं।',
                'preview.feature1': 'Glassmorphism UI डिज़ाइन',
                'preview.feature2': 'उन्नत कस्टमाइजेशन',
                'preview.feature3': 'प्रदर्शन अनुकूलन',
                'preview.feature4': 'बैटरी एन्हांसमेंट',
                'preview.download': 'अभी SleepOS आजमाएं',
                'community.title': 'हमारे समुदाय में शामिल हों',
                'community.description': 'हमारे सक्रिय समुदाय में हजारों डेवलपर्स और उत्साही लोगों से जुड़ें। विचार साझा करें, सहायता प्राप्त करें और Project Sleep के भविष्य में योगदान दें।',
                'community.discord': 'Discord सर्वर',
                'community.discord.desc': 'डेवलपर्स के साथ रीयल-टाइम चैट और त्वरित सहायता प्राप्त करें।',
                'community.join': 'Discord में शामिल हों',
                'community.telegram': 'Telegram समूह',
                'community.telegram.desc': 'नवीनतम रिलीज़ और घोषणाओं के साथ अपडेट रहें।',
                'community.visit': 'Telegram में शामिल हों',
                'community.forum': 'समुदाय फोरम',
                'community.forum.desc': 'गहन चर्चाएं और विस्तृत मार्गदर्शिकाएं।',
                'footer.description': 'Android के भविष्य के लिए उन्नत कस्टम ROM विकास।',
                'footer.privacy': 'गोपनीयता नीति',
                'footer.terms': 'सेवा की शर्तें',
                'footer.contact': 'हमसे संपर्क करें',
                'footer.copyright': '© 2024 Project Sleep. सभी अधिकार सुरक्षित।'
            },
            ja: {
                'nav.home': 'ホーム',
                'nav.features': '機能',
                'nav.download': 'ダウンロード',
                'nav.community': 'コミュニティ',
                'nav.about': 'について',
                'hero.download': 'SleepOSをダウンロード',
                'hero.explore': '機能を探索',
                'stats.users': 'アクティブユーザー',
                'stats.devices': '対応デバイス',
                'stats.stability': '安定性スコア',
                'features.title': 'コア機能',
                'features.subtitle': '最先端の機能と最適化で次世代のAndroidカスタマイズを体験してください。',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'HyperOSをベースにしたカスタムROMで、パフォーマンスとバッテリー最適化が向上しています。',
                'features.aosp': 'AOSPビルド',
                'features.aosp.desc': '最新のAOSPソースと最小限のブロートウェアで、純粋なAndroidエクスペリエンスを提供。',
                'features.hyperos': 'HyperOSモッド',
                'features.hyperos.desc': '追加のカスタマイズオプションとパフォーマンス調整でHyperOSを強化。',
                'features.performance': 'パフォーマンス',
                'features.performance.desc': '最大のパフォーマンスを実現する高度なカーネル最適化とシステム調整。',
                'features.learn': '詳しく見る',
                'preview.title': 'SleepOSインターフェース',
                'preview.description': 'HyperOSの最高の機能を高度なカスタマイズオプション、グラスモーフィズムデザイン要素、そしてAndroidエクスペリエンスを再定義するパフォーマンス最適化と組み合わせた革命的なインターフェースを体験してください。',
                'preview.feature1': 'グラスモーフィズムUIデザイン',
                'preview.feature2': '高度なカスタマイズ',
                'preview.feature3': 'パフォーマンス最適化',
                'preview.feature4': 'バッテリー強化',
                'preview.download': '今すぐSleepOSを試す',
                'community.title': '私たちのコミュニティに参加',
                'community.description': 'アクティブなコミュニティで数千人の開発者や愛好家とつながりましょう。アイデアを共有し、サポートを受け、Project Sleepの未来に貢献しましょう。',
                'community.discord': 'Discordサーバー',
                'community.discord.desc': '開発者とのリアルタイムチャットで即座にサポートを受けられます。',
                'community.join': 'Discordに参加',
                'community.telegram': 'Telegramグループ',
                'community.telegram.desc': '最新のリリースとお知らせを常に把握しましょう。',
                'community.visit': 'Telegramに参加',
                'community.forum': 'コミュニティフォーラム',
                'community.forum.desc': '詳細な議論と詳細なガイド。',
                'footer.description': 'Androidの未来のための高度なカスタムROM開発。',
                'footer.privacy': 'プライバシーポリシー',
                'footer.terms': '利用規約',
                'footer.contact': 'お問い合わせ',
                'footer.copyright': '© 2024 Project Sleep. すべての権利を保有。'
            },
            ka: {
                'nav.home': 'მთავარი',
                'nav.features': 'ფუნქციები',
                'nav.download': 'ჩამოტვირთვა',
                'nav.community': 'საზოგადოება',
                'nav.about': 'ჩვენს შესახებ',
                'hero.download': 'ჩამოტვირთეთ SleepOS',
                'hero.explore': 'ფუნქციების შესწავლა',
                'stats.users': 'აქტიური მომხმარებლები',
                'stats.devices': 'მხარდაჭერილი მოწყობილობები',
                'stats.stability': 'სტაბილურობის ქულა',
                'features.title': 'მთავარი ფუნქციები',
                'features.subtitle': 'განიცადეთ Android-ის მორგების შემდეგი თაობა ჩვენი უახლესი ფუნქციებით და ოპტიმიზაციებით.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'მორგებული ROM HyperOS-ის საფუძველზე გაუმჯობესებული წარმადობით და ბატარეის ოპტიმიზაციით.',
                'features.aosp': 'AOSP აგებულები',
                'features.aosp.desc': 'სუფთა Android გამოცდილება უახლესი AOSP წყაროებით და მინიმალური bloatware-ით.',
                'features.hyperos': 'HyperOS მოდები',
                'features.hyperos.desc': 'გაუმჯობესებული HyperOS დამატებითი მორგების ვარიანტებით და წარმადობის ტვიკებით.',
                'features.performance': 'წარმადობა',
                'features.performance.desc': 'წინასწარ განვითარებული ბირთვის ოპტიმიზაციები და სისტემური ტვიკები მაქსიმალური წარმადობისთვის.',
                'features.learn': 'მეტის გაგება',
                'preview.title': 'SleepOS ინტერფეისი',
                'preview.description': 'განიცადეთ რევოლუციური ინტერფეისი, რომელიც აერთიანებს HyperOS-ის საუკეთესო ფუნქციებს დაწინაურებულ მორგების ვარიანტებთან, glassmorphism დიზაინის ელემენტებთან და წარმადობის ოპტიმიზაციებთან, რომლებიც თავიდან განსაზღვრავენ თქვენს Android გამოცდილებას.',
                'preview.feature1': 'Glassmorphism UI დიზაინი',
                'preview.feature2': 'დაწინაურებული მორგება',
                'preview.feature3': 'წარმადობის ოპტიმიზაციები',
                'preview.feature4': 'ბატარეის გაუმჯობესებები',
                'preview.download': 'ცადე SleepOS ახლავე',
                'community.title': 'შემოგვიერთდით ჩვენს საზოგადოებაში',
                'community.description': 'დაუკავშირდით ათასობით დეველოპერსა და მოყვარულს ჩვენს აქტიურ საზოგადოებაში. გაუზიარეთ იდეები, მიიღეთ მხარდაჭერა და შეიტანეთ წვლილი Project Sleep-ის მომავალში.',
                'community.discord': 'Discord სერვერი',
                'community.discord.desc': 'რეალურ დროში ჩატი დეველოპერებთან და მყისიერი მხარდაჭერა.',
                'community.join': 'შეუერთდით Discord-ს',
                'community.telegram': 'Telegram ჯგუფი',
                'community.telegram.desc': 'დარჩით განახლებული უახლესი რელიზებით და განცხადებებით.',
                'community.visit': 'შეუერთდით Telegram-ს',
                'community.forum': 'საზოგადოების ფორუმი',
                'community.forum.desc': 'ღრმა დისკუსიები და დეტალური სახელმძღვანელოები.',
                'footer.description': 'Android-ის მომავლისთვის წინასწარ განვითარებული მორგებული ROM.',
                'footer.privacy': 'კონფიდენციალურობის პოლიტიკა',
                'footer.terms': 'მომსახურების პირობები',
                'footer.contact': 'დაგვიკავშირდით',
                'footer.copyright': '© 2024 Project Sleep. ყველა უფლება დაცულია.'
            },
            ar: {
                'nav.home': 'الرئيسية',
                'nav.features': 'الميزات',
                'nav.download': 'تحميل',
                'nav.community': 'المجتمع',
                'nav.about': 'حول',
                'hero.download': 'تحميل SleepOS',
                'hero.explore': 'استكشاف الميزات',
                'stats.users': 'المستخدمين النشطين',
                'stats.devices': 'الأجهزة المدعومة',
                'stats.stability': 'نقاط الاستقرار',
                'features.title': 'الميزات الأساسية',
                'features.subtitle': 'جرب الجيل القادم من تخصيص Android مع ميزاتنا المتطورة وتحسيناتنا.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'ROM مخصصة تعتمد على HyperOS مع تحسين الأداء والبطارية.',
                'features.aosp': 'بناء AOSP',
                'features.aosp.desc': 'تجربة Android نقية مع أحدث مصادر ASSP وأقل قدر ممكن من البرامج الضارة.',
                'features.hyperos': 'تعديلات HyperOS',
                'features.hyperos.desc': 'HyperOS المحسنة مع خيارات تخصيص إضافية وتحسينات الأداء.',
                'features.performance': 'الأداء',
                'features.performance.desc': 'تحسينات النواة المتقدمة وتعديلات النظام للحصول على أقصى أداء.',
                'features.learn': 'تعلم المزيد',
                'preview.title': 'واجهة SleepOS',
                'preview.description': 'جرب واجهة ثورية تجمع بين أفضل ميزات HyperOS مع خيارات تخصيص متقدمة، عناصر تصميم glassmorphism، وتحسينات الأداء التي تعيد تعريف تجربة Android الخاصة بك.',
                'preview.feature1': 'تصميم واجهة Glassmorphism',
                'preview.feature2': 'تخصيص متقدم',
                'preview.feature3': 'تحسينات الأداء',
                'preview.feature4': 'تحسينات البطارية',
                'preview.download': 'جرب SleepOS الآن',
                'community.title': 'انضم إلى مجتمعنا',
                'community.description': 'تواصل مع آلاف المطورين والمتحمسين في مجتمعنا النشط. شارك الأفكار، احصل على الدعم، وساهم في مستقبل Project Sleep.',
                'community.discord': 'خادم Discord',
                'community.discord.desc': 'الدردشة الفورية مع المطورين والحصول على الدعم الفوري.',
                'community.join': 'انضم إلى Discord',
                'community.telegram': 'مجموعة Telegram',
                'community.telegram.desc': 'ابق على اطلاع بأحدث الإصدارات والإعلانات.',
                'community.visit': 'انضم إلى Telegram',
                'community.forum': 'منتدى المجتمع',
                'community.forum.desc': 'مناقشات متعمقة وأدلة مفصلة.',
                'footer.description': 'تطوير ROM مخصص متقدم لمستقبل Android.',
                'footer.privacy': 'سياسة الخصوصية',
                'footer.terms': 'شروط الخدمة',
                'footer.contact': 'اتصل بنا',
                'footer.copyright': '© 2024 Project Sleep. جميع الحقوق محفوظة.'
            },
            jv: {
                'nav.home': 'Beranda',
                'nav.features': 'Fitur',
                'nav.download': 'Unduh',
                'nav.community': 'Komunitas',
                'nav.about': 'Babagan',
                'hero.download': 'Unduh SleepOS',
                'hero.explore': 'Jelajahi Fitur',
                'stats.users': 'Pengguna Aktif',
                'stats.devices': 'Perangkat Didukung',
                'stats.stability': 'Skor Stabilitas',
                'features.title': 'Fitur Inti',
                'features.subtitle': 'Rasakake generasi ngarepake saka kustomisasi Android kanthi fitur canggih lan optimasi kita.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'ROM kustom adhedhasar HyperOS kanthi peningkatan kinerja lan optimasi baterai.',
                'features.aosp': 'AOSP Builds',
                'features.aosp.desc': 'Pengalaman Android murni kanthi sumber AOSP paling anyar lan bloatware minimal.',
                'features.hyperos': 'HyperOS Mods',
                'features.hyperos.desc': 'HyperOS sing ditingkatake kanthi pilihan kustomisasi tambahan lan tweak kinerja.',
                'features.performance': 'Kinerja',
                'features.performance.desc': 'Optimasi kernel canggih lan tweak sistem kanggo kinerja maksimal.',
                'features.learn': 'Sinau Liyane',
                'preview.title': 'Antarmuka SleepOS',
                'preview.description': 'Rasakake antarmuka revolusioner sing nggabungake fitur paling apik saka HyperOS kanthi pilihan kustomisasi canggih, unsur desain glassmorphism, lan optimasi kinerja sing ngedefinisikan ulang pengalaman Android sampeyan.',
                'preview.feature1': 'Desain UI Glassmorphism',
                'preview.feature2': 'Kustomisasi Canggih',
                'preview.feature3': 'Optimasi Kinerja',
                'preview.feature4': 'Peningkatan Baterai',
                'preview.download': 'Coba SleepOS Saiki',
                'community.title': 'Gabung Komunitas Kita',
                'community.description': 'Sambung karo atusan pengembang lan penggemar ing komunitas aktif kita. Bagékake ide, entuk dhukungan, lan kontribusi marang masa depan Project Sleep.',
                'community.discord': 'Discord Server',
                'community.discord.desc': 'Obrolan real-time karo pengembang lan entuk dhukungan instan.',
                'community.join': 'Gabung Discord',
                'community.telegram': 'Telegram Group',
                'community.telegram.desc': 'Tetep nganyari kanthi rilis paling anyar lan pengumuman.',
                'community.visit': 'Gabung Telegram',
                'community.forum': 'Forum Komunitas',
                'community.forum.desc': 'Diskusi mendalam lan pandhuan rinci.',
                'footer.description': 'Pengembangan ROM kustom canggih kanggo masa depan Android.',
                'footer.privacy': 'Kebijakan Privasi',
                'footer.terms': 'Syarat Layanan',
                'footer.contact': 'Hubungi Kita',
                'footer.copyright': '© 2024 Project Sleep. Kabeh hak dilindhani.'
            },
            th: {
                'nav.home': 'หน้าแรก',
                'nav.features': 'ฟีเจอร์',
                'nav.download': 'ดาวน์โหลด',
                'nav.community': 'ชุมชน',
                'nav.about': 'เกี่ยวกับ',
                'hero.download': 'ดาวน์โหลด SleepOS',
                'hero.explore': 'สำรวจฟีเจอร์',
                'stats.users': 'ผู้ใช้ที่ใช้งานอยู่',
                'stats.devices': 'อุปกรณ์ที่รองรับ',
                'stats.stability': 'คะแนนความเสถียร',
                'features.title': 'ฟีเจอร์หลัก',
                'features.subtitle': 'สัมผัสประสบการณ์การปรับแต่ง Android รุ่นถัดไปด้วยฟีเจอร์ล้ำสมัยและการปรับปรุงของเรา',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'ROM ที่กำหนดเองบนพื้นฐาน HyperOS พร้อมประสิทธิภาพที่ดีขึ้นและการปรับแต่งแบตเตอรี่',
                'features.aosp': 'AOSP บิลด์',
                'features.aosp.desc': 'ประสบการณ์ Android บริสุทธิ์ด้วยแหล่ง AOSP ล่าสุดและ bloatware น้อยที่สุด',
                'features.hyperos': 'HyperOS ม็อด',
                'features.hyperos.desc': 'HyperOS ที่ปรับปรุงแล้วด้วยตัวเลือกการปรับแต่งเพิ่มเติมและการปรับประสิทธิภาพ',
                'features.performance': 'ประสิทธิภาพ',
                'features.performance.desc': 'การปรับแต่งเคอร์เนลขั้นสูงและการปรับระบบสำหรับประสิทธิภาพสูงสุด',
                'features.learn': 'เรียนรู้เพิ่มเติม',
                'preview.title': 'SleepOS อินเทอร์เฟซ',
                'preview.description': 'สัมผัสอินเทอร์เฟซปฏิวัติที่รวมสิ่งที่ดีที่สุดของ HyperOS ด้วยตัวเลือกการปรับแต่งขั้นสูง องค์ประกอบการออกแบบ glassmorphism และการปรับปรุงประสิทธิภาพที่重新定义ประสบการณ์ Android ของคุณ',
                'preview.feature1': 'การออกแบบ UI แบบกระจก',
                'preview.feature2': 'การปรับแต่งขั้นสูง',
                'preview.feature3': 'การปรับปรุงประสิทธิภาพ',
                'preview.feature4': 'การปรับปรุงแบตเตอรี่',
                'preview.download': 'ลอง SleepOS ตอนนี้',
                'community.title': 'เข้าร่วมชุมชนของเรา',
                'community.description': 'เชื่อมต่อกับนักพัฒนาและผู้ที่ชื่นชอบหลายพันคนในชุมชนที่ใช้งานอยู่ของเรา แบ่งปันไอเดีย รับการสนับสนุน และมีส่วนร่วมในอนาคตของ Project Sleep',
                'community.discord': 'Discord เซิร์ฟเวอร์',
                'community.discord.desc': 'แชทแบบเรียลไทม์กับนักพัฒนาและรับการสนับสนุนทันที',
                'community.join': 'เข้าร่วม Discord',
                'community.telegram': 'Telegram กรุ๊ป',
                'community.telegram.desc': 'ติดตามข่าวสารล่าสุดเกี่ยวกับรุ่นและประกาศ',
                'community.visit': 'เข้าร่วม Telegram',
                'community.forum': 'ฟอรั่มชุมชน',
                'community.forum.desc': 'การสนทนาเชิงลึกและคำแนะนำโดยละเอียด',
                'footer.description': 'การพัฒนา ROM แบบกำหนดเองขั้นสูงสำหรับอนาคตของ Android',
                'footer.privacy': 'นโยบายความเป็นส่วนตัว',
                'footer.terms': 'เงื่อนไขการให้บริการ',
                'footer.contact': 'ติดต่อเรา',
                'footer.copyright': '© 2024 Project Sleep. สงวนลิขสิทธิ์.'
            },
            vi: {
                'nav.home': 'Trang chủ',
                'nav.features': 'Tính năng',
                'nav.download': 'Tải xuống',
                'nav.community': 'Cộng đồng',
                'nav.about': 'Giới thiệu',
                'hero.download': 'Tải SleepOS',
                'hero.explore': 'Khám phá tính năng',
                'stats.users': 'NgườI dùng hoạt động',
                'stats.devices': 'Thiết bị được hỗ trợ',
                'stats.stability': 'Điểm ổn định',
                'features.title': 'Tính năng cốt lõi',
                'features.subtitle': 'Trải nghiệm thế hệ tiếp theo của tùy chỉnh Android với các tính năng tiên tiến và tối ưu hóa của chúng tôi.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'ROM tùy chỉnh dựa trên HyperOS với hiệu suất được cải thiện và tối ưu hóa pin.',
                'features.aosp': 'Bản dựng AOSP',
                'features.aosp.desc': 'Trải nghiệm Android thuần túy với nguồn AOSP mới nhất và phần mềm rác tối thiểu.',
                'features.hyperos': 'Mod HyperOS',
                'features.hyperos.desc': 'HyperOS được nâng cấp với các tùy chọn tùy chỉnh bổ sung và tinh chỉnh hiệu suất.',
                'features.performance': 'Hiệu suất',
                'features.performance.desc': 'Tối ưu hóa hạt nhân nâng cao và tinh chỉnh hệ thống để có hiệu suất tối đa.',
                'features.learn': 'Tìm hiểu thêm',
                'preview.title': 'Giao diện SleepOS',
                'preview.description': 'Trải nghiệm giao diện mang tính cách mạng kết hợp những điều tốt nhất của HyperOS với các tùy chọn tùy chỉnh nâng cao, yếu tố thiết kế glassmorphism và tối ưu hóa hiệu suất định nghĩa lại trải nghiệm Android của bạn.',
                'preview.feature1': 'Thiết kế UI Glassmorphism',
                'preview.feature2': 'Tùy chỉnh nâng cao',
                'preview.feature3': 'Tối ưu hóa hiệu suất',
                'preview.feature4': 'Cải thiện pin',
                'preview.download': 'Dùng thử SleepOS ngay',
                'community.title': 'Tham gia cộng đồng của chúng tôi',
                'community.description': 'Kết nối với hàng ngàn nhà phát triển và ngườI đam mê trong cộng đồng năng động của chúng tôi. Chia sẻ ý tưởng, nhận hỗ trợ và đóng góp cho tương lai của Project Sleep.',
                'community.discord': 'Máy chủ Discord',
                'community.discord.desc': 'Trò chuyện thờI gian thực với các nhà phát triển và nhận hỗ trợ tức thì.',
                'community.join': 'Tham gia Discord',
                'community.telegram': 'Nhóm Telegram',
                'community.telegram.desc': 'Luôn cập nhật với các phiên bản và thông báo mới nhất.',
                'community.visit': 'Tham gia Telegram',
                'community.forum': 'Diễn đàn cộng đồng',
                'community.forum.desc': 'Thảo luận chuyên sâu và hướng dẫn chi tiết.',
                'footer.description': 'Phát triển ROM tùy chỉnh nâng cao cho tương lai của Android.',
                'footer.privacy': 'Chính sách quyền riêng tư',
                'footer.terms': 'Điều khoản dịch vụ',
                'footer.contact': 'Liên hệ với chúng tôi',
                'footer.copyright': '© 2024 Project Sleep. Đã đăng ký bản quyền.'
            },
            es: {
                'nav.home': 'Inicio',
                'nav.features': 'Características',
                'nav.download': 'Descargar',
                'nav.community': 'Comunidad',
                'nav.about': 'Acerca de',
                'hero.download': 'Descargar SleepOS',
                'hero.explore': 'Explorar características',
                'stats.users': 'Usuarios activos',
                'stats.devices': 'Dispositivos compatibles',
                'stats.stability': 'Puntuación de estabilidad',
                'features.title': 'Características principales',
                'features.subtitle': 'Experimenta la próxima generación de personalización de Android con nuestras características de vanguarda y optimizaciones.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'ROM personalizada basada en HyperOS con mejor rendimiento y optimización de batería.',
                'features.aosp': 'Compilaciones AOSP',
                'features.aosp.desc': 'Experiencia Android pura con las fuentes AOSP más recientes y bloatware mínimo.',
                'features.hyperos': 'Mods HyperOS',
                'features.hyperos.desc': 'HyperOS mejorada con opciones de personalización adicionales y ajustes de rendimiento.',
                'features.performance': 'Rendimiento',
                'features.performance.desc': 'Optimizaciones avanzadas del kernel y ajustes del sistema para el máximo rendimiento.',
                'features.learn': 'Aprender más',
                'preview.title': 'Interfaz SleepOS',
                'preview.description': 'Experimenta una interfaz revolucionaria que combina lo mejor de HyperOS con opciones de personalización avanzadas, elementos de diseño glassmorphism y optimizaciones de rendimiento que redefinen tu experiencia Android.',
                'preview.feature1': 'Diseño UI Glassmorphism',
                'preview.feature2': 'Personalización avanzada',
                'preview.feature3': 'Optimizaciones de rendimiento',
                'preview.feature4': 'Mejoras de batería',
                'preview.download': 'Prueba SleepOS ahora',
                'community.title': 'Únete a nuestra comunidad',
                'community.description': 'Conéctate con miles de desarrolladores y entusiastas en nuestra comunidad activa. Comparte ideas, obtén soporte y contribuye al futuro de Project Sleep.',
                'community.discord': 'Servidor Discord',
                'community.discord.desc': 'Chat en tiempo real con desarrolladores y soporte instantáneo.',
                'community.join': 'Únete a Discord',
                'community.telegram': 'Grupo Telegram',
                'community.telegram.desc': 'Mantente actualizado con los últimos lanzamientos y anuncios.',
                'community.visit': 'Únete a Telegram',
                'community.forum': 'Foro de la comunidad',
                'community.forum.desc': 'Discusiones en profundidad y guías detalladas.',
                'footer.description': 'Desarrollo avanzado de ROM personalizada para el futuro de Android.',
                'footer.privacy': 'Política de privacidad',
                'footer.terms': 'Términos de servicio',
                'footer.contact': 'Contáctanos',
                'footer.copyright': '© 2024 Project Sleep. Todos los derechos reservados.'
            },
            pt: {
                'nav.home': 'Início',
                'nav.features': 'Recursos',
                'nav.download': 'Baixar',
                'nav.community': 'Comunidade',
                'nav.about': 'Sobre',
                'hero.download': 'Baixar SleepOS',
                'hero.explore': 'Explorar recursos',
                'stats.users': 'Usuários ativos',
                'stats.devices': 'Dispositivos suportados',
                'stats.stability': 'Pontuação de estabilidade',
                'features.title': 'Recursos principais',
                'features.subtitle': 'Experimente a próxima geração de personalização do Android com nossos recursos de ponta e otimizações.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'ROM personalizada baseada no HyperOS com desempenho aprimorado e otimização de bateria.',
                'features.aosp': 'Builds AOSP',
                'features.aosp.desc': 'Experiência Android pura com as fontes AOSP mais recentes e bloatware mínimo.',
                'features.hyperos': 'Mods HyperOS',
                'features.hyperos.desc': 'HyperOS aprimorado com opções de personalização adicionais e ajustes de desempenho.',
                'features.performance': 'Desempenho',
                'features.performance.desc': 'Otimizações avançadas do kernel e ajustes do sistema para desempenho máximo.',
                'features.learn': 'Saber mais',
                'preview.title': 'Interface SleepOS',
                'preview.description': 'Experimente uma interface revolucionária que combina o melhor do HyperOS com opções de personalização avançadas, elementos de design glassmorphism e otimizações de desempenho que redefinem sua experiência Android.',
                'preview.feature1': 'Design UI Glassmorphism',
                'preview.feature2': 'Personalização avançada',
                'preview.feature3': 'Otimizações de desempenho',
                'preview.feature4': 'Melhorias de bateria',
                'preview.download': 'Experimente SleepOS agora',
                'community.title': 'Junte-se à nossa comunidade',
                'community.description': 'Conecte-se com milhares de desenvolvedores e entusiastas em nossa comunidade ativa. Compartilhe ideias, obtenha suporte e contribua para o futuro do Project Sleep.',
                'community.discord': 'Servidor Discord',
                'community.discord.desc': 'Chat em tempo real com desenvolvedores e suporte instantâneo.',
                'community.join': 'Junte-se ao Discord',
                'community.telegram': 'Grupo Telegram',
                'community.telegram.desc': 'Mantenha-se atualizado com os últimos lançamentos e anúncios.',
                'community.visit': 'Junte-se ao Telegram',
                'community.forum': 'Fórum da comunidade',
                'community.forum.desc': 'Discussões aprofundadas e guias detalhados.',
                'footer.description': 'Desenvolvimento avançado de ROM personalizada para o futuro do Android.',
                'footer.privacy': 'Política de privacidade',
                'footer.terms': 'Termos de serviço',
                'footer.contact': 'Contate-nos',
                'footer.copyright': '© 2024 Project Sleep. Todos os direitos reservados.'
            },
            de: {
                'nav.home': 'Startseite',
                'nav.features': 'Funktionen',
                'nav.download': 'Herunterladen',
                'nav.community': 'Community',
                'nav.about': 'Über uns',
                'hero.download': 'SleepOS herunterladen',
                'hero.explore': 'Funktionen erkunden',
                'stats.users': 'Aktive Benutzer',
                'stats.devices': 'Unterstützte Geräte',
                'stats.stability': 'Stabilitätswert',
                'features.title': 'Kernfunktionen',
                'features.subtitle': 'Erleben Sie die nächste Generation der Android-Anpassung mit unseren hochmodernen Funktionen und Optimierungen.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': 'Benutzerdefinierte ROM basierend auf HyperOS mit verbesserter Leistung und Batterieoptimierung.',
                'features.aosp': 'AOSP-Builds',
                'features.aosp.desc': 'Reines Android-Erlebnis mit den neuesten AOSP-Quellen und minimalem Bloatware.',
                'features.hyperos': 'HyperOS-Mods',
                'features.hyperos.desc': 'Verbessertes HyperOS mit zusätzlichen Anpassungsoptionen und Leistungsoptimierungen.',
                'features.performance': 'Leistung',
                'features.performance.desc': 'Erweiterte Kernel-Optimierungen und System-Tweaks für maximale Leistung.',
                'features.learn': 'Mehr erfahren',
                'preview.title': 'SleepOS-Schnittstelle',
                'preview.description': 'Erleben Sie ein revolutionäres Interface, das das Beste von HyperOS mit erweiterten Anpassungsoptionen, Glassmorphism-Designelementen und Leistungsoptimierungen kombiniert, die Ihr Android-Erlebnis neu definieren.',
                'preview.feature1': 'Glassmorphism UI-Design',
                'preview.feature2': 'Erweiterte Anpassung',
                'preview.feature3': 'Leistungsoptimierungen',
                'preview.feature4': 'Batterie-Verbesserungen',
                'preview.download': 'SleepOS jetzt ausprobieren',
                'community.title': 'Treten Sie unserer Community bei',
                'community.description': 'Verbinden Sie sich mit Tausenden von Entwicklern und Enthusiasten in unserer aktiven Community. Teilen Sie Ideen, erhalten Sie Unterstützung und tragen Sie zur Zukunft von Project Sleep bei.',
                'community.discord': 'Discord-Server',
                'community.discord.desc': 'Echtzeit-Chat mit Entwicklern und sofortige Unterstützung.',
                'community.join': 'Discord beitreten',
                'community.telegram': 'Telegram-Gruppe',
                'community.telegram.desc': 'Bleiben Sie mit den neuesten Veröffentlichungen und Ankündigungen auf dem Laufenden.',
                'community.visit': 'Telegram beitreten',
                'community.forum': 'Community-Forum',
                'community.forum.desc': 'Tiefgreifende Diskussionen und detaillierte Anleitungen.',
                'footer.description': 'Fortgeschrittene benutzerdefinierte ROM-Entwicklung für die Zukunft von Android.',
                'footer.privacy': 'Datenschutzrichtlinie',
                'footer.terms': 'Nutzungsbedingungen',
                'footer.contact': 'Kontaktieren Sie uns',
                'footer.copyright': '© 2024 Project Sleep. Alle Rechte vorbehalten.'
            },
            ko: {
                'nav.home': '홈',
                'nav.features': '기능',
                'nav.download': '다운로드',
                'nav.community': '커뮤니티',
                'nav.about': '소개',
                'hero.download': 'SleepOS 다운로드',
                'hero.explore': '기능 탐색',
                'stats.users': '활성 사용자',
                'stats.devices': '지원 기기',
                'stats.stability': '안정성 점수',
                'features.title': '핵심 기능',
                'features.subtitle': '우리의 최첨단 기능과 최적화로 Android 커스터마이징의 차세대를 경험하세요.',
                'features.sleepos': 'SleepOS',
                'features.sleepos.desc': '향상된 성능과 배터리 최적화를 갖춘 HyperOS 기반 맞춤형 ROM.',
                'features.aosp': 'AOSP 빌드',
                'features.aosp.desc': '최신 AOSP 소스와 최소한의 블로트웨어로 순수한 Android 경험.',
                'features.hyperos': 'HyperOS 모드',
                'features.hyperos.desc': '추가 커스터마이징 옵션과 성능 조정이 있는 향상된 HyperOS.',
                'features.performance': '성능',
                'features.performance.desc': '최대 성능을 위한 고급 커널 최적화 및 시스템 트윅.',
                'features.learn': '더 알아보기',
                'preview.title': 'SleepOS 인터페이스',
                'preview.description': 'HyperOS의 최고 기능과 고급 커스터마이징 옵션, 글래스모피즘 디자인 요소 및 Android 경험을 재정의하는 성능 최적화를 결합한 혁명적인 인터페이스를 경험하세요.',
                'preview.feature1': '글래스모피즘 UI 디자인',
                'preview.feature2': '고급 커스터마이징',
                'preview.feature3': '성능 최적화',
                'preview.feature4': '배터리 향상',
                'preview.download': '지금 SleepOS 사용핳보기',
                'community.title': '우리 커뮤니티에 가입하세요',
                'community.description': '활발한 커뮤니티의 수천 명의 개발자 및 애호가들과 연결하세요. 아이디어를 공유하고, 지원을 받고, Project Sleep의 미래에 기여하세요.',
                'community.discord': 'Discord 서버',
                'community.discord.desc': '개발자들과의 실시간 채팅 및 즉각적인 지원.',
                'community.join': 'Discord 가입',
                'community.telegram': 'Telegram 그룹',
                'community.telegram.desc': '최신 릴리스 및 공지사항을 최신 상태로 유지하세요.',
                'community.visit': 'Telegram 가입',
                'community.forum': '커뮤니티 포럼',
                'community.forum.desc': '심층적인 논의 및 자세한 가이드.',
                'footer.description': 'Android의 미래를 위한 고급 맞춤형 ROM 개발.',
                'footer.privacy': '개인정보 보호정책',
                'footer.terms': '서비스 약관',
                'footer.contact': '문의하기',
                'footer.copyright': '© 2024 Project Sleep. 모든 권리 보유.'
            }
        };
        
        this.applyTranslations();
        this.setupLanguageDropdown();
    }
    
    setupLanguageDropdown() {
        const langToggle = document.getElementById('langToggle');
        const langDropdown = document.getElementById('langDropdown');
        
        if (langToggle && langDropdown) {
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('active');
            });
            
            document.addEventListener('click', () => {
                langDropdown.classList.remove('active');
            });
            
            langDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Language selection
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                this.setLanguage(lang);
                langDropdown.classList.remove('active');
            });
        });
    }
    
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Handle RTL languages
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.removeAttribute('dir');
            document.body.removeAttribute('dir');
        }
        
        this.applyTranslations();
    }
    
    applyTranslations() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                element.textContent = this.translations[this.currentLang][key];
            }
        });
    }
    
    // Navigation
    setupNavigation() {
        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
    
    // Page Navigation with Transition
    navigateTo(url) {
        const transition = document.getElementById('pageTransition');
        
        if (transition) {
            transition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        } else {
            window.location.href = url;
        }
    }
    
    // Hero Typewriter Effect
    setupHeroTypewriter() {
        const heroSubtitles = {
            en: [
                'Custom ROM AOSP, HyperOS Mod, and Android Development',
                'Next-generation Android customization',
                'Performance meets innovation'
            ],
            id: [
                'ROM Kustom AOSP, Mod HyperOS, dan Pengembangan Android',
                'Kustomisasi Android generasi berikutnya',
                'Performa bertemu inovasi'
            ]
        };
        
        const subtitleElement = document.getElementById('heroSubtitle');
        if (subtitleElement && heroSubtitles[this.currentLang]) {
            new Typed('#heroSubtitle', {
                strings: heroSubtitles[this.currentLang],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }
    
    // Particle System
    setupParticleSystem() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        try {
            this.particleApp = new PIXI.Application({
                view: canvas,
                width: window.innerWidth,
                height: window.innerHeight,
                transparent: true,
                antialias: true
            });
            
            this.createParticles();
            this.animateParticles();
            
            // Resize handler
            window.addEventListener('resize', () => {
                this.particleApp.renderer.resize(window.innerWidth, window.innerHeight);
            });
        } catch (error) {
            console.log('PIXI.js not available, using fallback background');
        }
    }
    
    createParticles() {
        if (!this.particleApp) return;
        
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
        
        for (let i = 0; i < particleCount; i++) {
            const particle = new PIXI.Graphics();
            particle.beginFill(0x00D4FF, Math.random() * 0.5 + 0.2);
            particle.drawCircle(0, 0, Math.random() * 3 + 1);
            particle.endFill();
            
            particle.x = Math.random() * window.innerWidth;
            particle.y = Math.random() * window.innerHeight;
            particle.vx = (Math.random() - 0.5) * 0.5;
            particle.vy = (Math.random() - 0.5) * 0.5;
            particle.life = Math.random();
            
            this.particles.push(particle);
            this.particleApp.stage.addChild(particle);
        }
    }
    
    animateParticles() {
        if (!this.particleApp) return;
        
        const animate = () => {
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life += 0.01;
                
                // Wrap around screen
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;
                
                // Pulsing effect
                particle.alpha = Math.sin(particle.life) * 0.5 + 0.5;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.feature-card, .hover-lift').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Animated Counters
    setupCounters() {
        const counters = document.querySelectorAll('.stats-counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        };
        
        // Trigger counters when visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Event Listeners
    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
        
        // Mouse move effect for particles
        document.addEventListener('mousemove', (e) => {
            if (this.particles.length > 0) {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                this.particles.forEach(particle => {
                    const dx = mouseX - particle.x;
                    const dy = mouseY - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        particle.vx -= dx * 0.0001;
                        particle.vy -= dy * 0.0001;
                    }
                });
            }
        });
        
        // Button hover effects
        document.querySelectorAll('.hover-lift').forEach(button => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
    
    // Community Links
    openCommunity(platform) {
        const links = {
            discord: 'https://discord.gg/project-sleep',
            telegram: 'https://t.me/project_sleep',
            forum: 'https://forum.project-sleep.com'
        };
        
        // Show coming soon message for now
        this.showNotification(`${platform.charAt(0).toUpperCase() + platform.slice(1)} community coming soon!`);
    }
    
    // Notification System
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-6 glass-dark rounded-lg p-4 text-white z-50';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad',
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: notification,
                        translateX: 300,
                        opacity: 0,
                        duration: 300,
                        easing: 'easeInQuad',
                        complete: () => {
                            document.body.removeChild(notification);
                        }
                    });
                }, 3000);
            }
        });
    }
    
    // Animation System
    setupAnimations() {
        // Stagger animation for feature cards
        anime({
            targets: '.feature-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutQuad'
        });
    }
}

// Global Functions
function navigateTo(url) {
    if (window.projectSleep) {
        window.projectSleep.navigateTo(url);
    } else {
        window.location.href = url;
    }
}

function openCommunity(platform) {
    if (window.projectSleep) {
        window.projectSleep.openCommunity(platform);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectSleep = new ProjectSleep();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectSleep;
}