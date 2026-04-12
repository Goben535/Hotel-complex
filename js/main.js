document.addEventListener('DOMContentLoaded', function() {
    fetch('data.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlString, "application/xml");
            const getTxt = (s) => xml.querySelector(s)?.textContent || "";

            const hotelName = getTxt('info name');
            const hotelPhone = getTxt('info phone');
            const hotelAddr = getTxt('info address');

            document.querySelectorAll('#logo, #logo-footer').forEach(el => el.textContent = hotelName);
            document.querySelectorAll('#phone, #phone-footer').forEach(el => el.textContent = hotelPhone);
            
            if(document.getElementById('desc-footer')) document.getElementById('desc-footer').textContent = getTxt('info desc');
            if(document.getElementById('addr-footer')) document.getElementById('addr-footer').textContent = hotelAddr;

            const navs = [document.getElementById('nav')];
            const navFooter = document.getElementById('nav-footer');
            const navItems = xml.querySelectorAll('navigation item');
            
            navs.forEach(nav => {
                if (nav) {
                    nav.innerHTML = '';
                    navItems.forEach(item => {
                        const li = document.createElement('li');
                        li.innerHTML = `<a href="${item.getAttribute('link')}">${item.textContent}</a>`;
                        nav.appendChild(li);
                    });
                }
            });
            
            if (navFooter) {
                navFooter.innerHTML = '';
                navItems.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${item.getAttribute('link')}">${item.textContent}</a>`;
                    navFooter.appendChild(li);
                });
            }

            if (document.getElementById('title-hero')) {
                document.getElementById('title-hero').textContent = getTxt('hero title');
                document.getElementById('desc-hero').textContent = getTxt('hero subtitle');
            }

            if (document.getElementById('rooms-list')) {
                document.getElementById('title-rooms').textContent = getTxt('rooms_page title');
                document.getElementById('desc-rooms').textContent = getTxt('rooms_page description');

                const container = document.getElementById('rooms-list');
                const currency = getTxt('currency');
                const rooms = xml.querySelectorAll('room');

                rooms.forEach(room => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <div class="img" style="background-image: url('${room.querySelector('image').textContent}')">
                            <div class="badge">${room.querySelector('price').textContent}${currency} / ночь</div>
                        </div>
                        <div class="info">
                            <span class="tag">${room.querySelector('features').textContent}</span>
                            <h3>${room.querySelector('title').textContent}</h3>
                            <p>${room.querySelector('desc').textContent}</p>
                            <a href="form.html" class="btn-alt">Выбрать этот номер</a>
                        </div>
                    `;
                    container.appendChild(card);
                });
            }

            if (document.getElementById('title-contacts')) {
                document.getElementById('title-contacts').textContent = getTxt('contacts_page title') || "Контакты";
                document.getElementById('desc-contacts').textContent = getTxt('contacts_page subtitle') || "Мы всегда на связи, чтобы помочь вам.";
            }

            if(document.getElementById('addr-info')) document.getElementById('addr-info').textContent = hotelAddr;
            if(document.getElementById('phone-info')) document.getElementById('phone-info').textContent = hotelPhone;
            if(document.getElementById('email-info')) {
                const xmlEmail = getTxt('contacts_page emails item');
                document.getElementById('email-info').textContent = xmlEmail ? xmlEmail : "goydahotel@gmail.com"; 
            }
        });

    const form = document.getElementById('form-msg');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            console.log("Данные для XML:", Object.fromEntries(formData));
            alert("Сообщение успешно отправлено!");
            form.reset();
        });
    }

    const bookingForm = document.getElementById('form-book');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            console.log("Данные бронирования:", Object.fromEntries(formData));
            alert("Заявка на бронирование отправлена!");
            bookingForm.reset();
        });
    }
});