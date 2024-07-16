const defaultGameState = {
    started: false,
    ended: false,
    pause: false,
    blocked: false,
    score: 0,
    maxscore: 0,
    health: 100,
    objetiveTime: 1500,
    changeObjetiveTime: 50,
    board: {
        size: 500,
        canvas: null,
        ctx: null,
        colors: {
            objetiveColor: "black",
            pointColor: "yellow",
            missColor: "#bbbbbb",
            BgMissColor: "white",
            BgPointColor: "white",
            BgColor: "white",
        },
    },
    objetivePosition: {
        x: 0,
        y: 0,
        size: 0,
    },
};

export default defaultGameState;