export const changePNGs = (png1Id, png2Id, sect2Id) => {
    let png1 = document.getElementById(png1Id);
    let png2 = document.getElementById(png2Id);
    let sect2 = document.getElementById(sect2Id);
    let rect = sect2.getBoundingClientRect();
    if (rect.top < window.innerHeight - 300) {
        png2.style.display = 'flex';
        png1.style.display = 'none';
    }
    else {
        png1.style.display = 'flex';
        png2.style.display = 'none';
    }
};

