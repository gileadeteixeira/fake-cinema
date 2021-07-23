//MINHAS FUNÇÕES

export const gerarPosterGenerico = ({index}) => {
    return {
        url: "https://via.placeholder.com/180x270?text=Poster+Fake",
        html: `
            <img src="https://via.placeholder.com/180x270?text=Poster+Fake+${index}" alt="Fake_Poster">
            <p>Genérico ${index}</p>
        `,
    }
};
export const gerarPosterExemplo = ({background_color, text_color, index}) => {
    return{
        url: `https://via.placeholder.com/180x270/${background_color}/${text_color}?text=Poster+Fake`,
        html:`
            <img src="https://via.placeholder.com/180x270/${background_color}/${text_color}?text=Poster+Fake" alt="Fake_Poster">
            <p>Exemplo ${index}</p>
        `,
    }
};

//FUNÇÕES DA INTERNET

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
export const smoothScrollTo = (endX, endY, duration)=>{
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
        clearInterval(timer);
    }
    window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
}