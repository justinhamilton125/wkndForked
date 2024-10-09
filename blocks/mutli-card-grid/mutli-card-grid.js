export default function decorate(block) {
const cardData = {
    Tab1: [
        { id: 1, title: 'Card 1A', content: 'Content for Card 1A' },
        { id: 2, title: 'Card 1B', content: 'Content for Card 1B' },
    ],
    Tab2: [
        { id: 3, title: 'Card 2A', content: 'Content for Card 2A' },
        { id: 4, title: 'Card 2B', content: 'Content for Card 2B' },
    ],
    Tab3: [
        { id: 5, title: 'Card 3A', content: 'Content for Card 3A' },
        { id: 6, title: 'Card 3B', content: 'Content for Card 3B' },
    ],
};

function showTab(tab) {
    const buttons = document.querySelectorAll('.tabs button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent === tab) {
            button.classList.add('active');
        }
    });

    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    cardData[tab].forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<h3>${card.title}</h3><p>${card.content}</p>`;
        cardContainer.appendChild(cardElement);
    });
}

// Initialize with the first tab
showTab('Tab1');
}