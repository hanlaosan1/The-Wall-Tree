addLayer("w", {
    name: "wall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A9A9A9",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "wall", // Name of prestige currency
    baseResource: "time", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasChallenge('w',12)) mult=mult.times(4)
        if(inChallenge('w',12)||inChallenge('w',13)) mult=mult.div(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp=new Decimal(1)
        if(hasChallenge('w',13)) exp=exp.add(0.05)
        return exp
    },
    passiveGeneration(){
        if(hasUpgrade('w',11)) return 0.001
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    upgrades:{
        11:{
            name:"wu1",
            title:"自动被墙",
            description:"每秒获取重置时获取的墙的%0.1",
            cost:new Decimal(1),
        },
        12:{
            name:"unlwc1",
            title:"更墙的来了",
            description:"解锁墙挑战1",
            cost:new Decimal(5)
        },
        13:{
            name:"unlwc2",
            title:"比上个还墙",
            description:"解锁墙挑战2",
            cost:new Decimal(10)
        },
        14:{
            name:"unlwc3",
            title:"我不想被墙了",
            description:"解锁墙挑战3",
            cost:new Decimal(20)
        },
    },
    challenges: {
        11: {
            name: "wc1",
            challengeDescription: "时间获取速度/10",
            goalDescription:"拥有1墙",
            canComplete: function() {return player[this.layer].points.gte(1)},
            onEnter(){
                player.points=new Decimal(0)
                player.w.points=new Decimal(0)
            },
            rewardDescription:"时间获取速度*9",
            unlocked(){return hasUpgrade('w',12)}
        },
        12: {
            name: "wc2",
            challengeDescription: "墙获取/5",
            goalDescription:"拥有5墙",
            canComplete: function() {return player[this.layer].points.gte(5)},
            onEnter(){
                player.points=new Decimal(0)
                player.w.points=new Decimal(0)
            },
            rewardDescription:"墙获取*4",
            unlocked(){return hasUpgrade('w',13)&&hasChallenge('w',11)}
        },
        13: {
            name: "wc3",
            challengeDescription: "时间获取速度/10,墙获取/5",
            goalDescription:"拥有10墙",
            canComplete: function() {return player[this.layer].points.gte(10)},
            onEnter(){
                player.points=new Decimal(0)
                player.w.points=new Decimal(0)
            },
            rewardDescription:"时间获取速度和墙获取^1.05",
            unlocked(){return hasUpgrade('w',14)&&hasChallenge('w',12)}
        },
    },
    layerShown(){return true}
})
