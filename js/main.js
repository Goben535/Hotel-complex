document.addEventListener('DOMContentLoaded', function() {
    fetch('data.xml')
        .then(function(response) {
            return response.text();
        })
        .then(function(xmlString) {
            let parser = new DOMParser();
            let xml = parser.parseFromString(xmlString, "application/xml");
            
            let getTxt = function(s) {
                let element = xml.querySelector(s);
                if (element) {
                    return element.textContent;
                }
                return "";
            };

            let hotelName = getTxt('info name');
            let hotelPhone = getTxt('info phone');
            let hotelAddr = getTxt('info address');

            let logos = document.querySelectorAll('#logo, #logo-footer');
            for (let i = 0; i < logos.length; i++) {
                logos[i].textContent = hotelName;
            }

            let phones = document.querySelectorAll('#phone, #phone-footer');
            for (let i = 0; i < phones.length; i++) {
                phones[i].textContent = hotelPhone;
            }
            
            if (document.getElementById('desc-footer')) {
                document.getElementById('desc-footer').textContent = getTxt('info desc');
            }
            if (document.getElementById('addr-footer')) {
                document.getElementById('addr-footer').textContent = hotelAddr;
            }

            let navs = [document.getElementById('nav')];
            let navFooter = document.getElementById('nav-footer');
            let navItems = xml.querySelectorAll('navigation item');
            
            for (let i = 0; i < navs.length; i++) {
                if (navs[i]) {
                    navs[i].innerHTML = '';
                    for (let j = 0; j < navItems.length; j++) {
                        let li = document.createElement('li');
                        li.innerHTML = '<a href="' + navItems[j].getAttribute('link') + '">' + navItems[j].textContent + '</a>';
                        navs[i].appendChild(li);
                    }
                }
            }
            
            if (navFooter) {
                navFooter.innerHTML = '';
                for (let i = 0; i < navItems.length; i++) {
                    let li = document.createElement('li');
                    li.innerHTML = '<a href="' + navItems[i].getAttribute('link') + '">' + navItems[i].textContent + '</a>';
                    navFooter.appendChild(li);
                }
            }

            if (document.getElementById('title-hero')) {
                document.getElementById('title-hero').textContent = getTxt('hero title');
                document.getElementById('desc-hero').textContent = getTxt('hero subtitle');
            }

            if (document.getElementById('rooms-list')) {
                document.getElementById('title-rooms').textContent = getTxt('rooms_page title');
                document.getElementById('desc-rooms').textContent = getTxt('rooms_page description');

                let container = document.getElementById('rooms-list');
                let currency = getTxt('currency');
                let rooms = xml.querySelectorAll('room');

                for (let i = 0; i < rooms.length; i++) {
                    let card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <div class="img" style="background-image: url('${rooms[i].querySelector('image').textContent}')">
                            <div class="badge">${rooms[i].querySelector('price').textContent}${currency} / ночь</div>
                        </div>
                        <div class="info">
                            <span class="tag">${rooms[i].querySelector('features').textContent}</span>
                            <h3>${rooms[i].querySelector('title').textContent}</h3>
                            <p>${rooms[i].querySelector('desc').textContent}</p>
                            <a href="form.html" class="btn-alt">Выбрать этот номер</a>
                        </div>
                    `;
                    container.appendChild(card);
                }
            }

            if (document.getElementById('title-contacts')) {
                document.getElementById('title-contacts').textContent = getTxt('contacts_page title');
                document.getElementById('desc-contacts').textContent = getTxt('contacts_page subtitle');
            }

            if (document.getElementById('addr-info')) {
                document.getElementById('addr-info').textContent = hotelAddr;
            }
            if (document.getElementById('phone-info')) {
                document.getElementById('phone-info').textContent = hotelPhone;
            }
            if (document.getElementById('email-info')) {
                document.getElementById('email-info').textContent = getTxt('contacts_page emails item'); 
            }
        });
});