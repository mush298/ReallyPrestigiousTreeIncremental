addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
   11: {
    title: `The beginning`,
    description: `Multiply your point gain.`,
    cost: new Decimal(1),
    effect() {
        let e = new Decimal(2)
        if (hasUpgrade('p', 12)) e = e.times(upgradeEffect('p', 12))
        return e
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
      },
    
    12: {
        title: `A helpful upgrade`,
        description: `Boost "The beginning" by your points`,
        cost: new Decimal(3),
        effect() {
            return new Decimal(1).add(player.points.pow(0.25))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
          },

          13: {
            title: `A pointy boost`,
            description: `Points are multiplied by prestige points`,
            cost: new Decimal(20),
            effect() {
                return new Decimal(1).add(player.p.points.pow(0.5))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            },

            14: {
                title: `Returning the favor`,
                description: `Prestige points are multiplied by points`,
                cost: new Decimal(50),
                effect() {
                    return new Decimal(1).add(player.points.pow(0.2))
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            },
            15: {
                title: `A <h2>BIG</h2> boost!`,
                description: `Points multiply themselves`,
                cost: new Decimal(500),
                effect() {
                    return new Decimal(1).add(player.points.pow(0.25))
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            },
        },
    
    layerShown(){return true}
})
