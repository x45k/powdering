import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
const config = new DefaultConfig("Powdering", "data/settings.json")
const schemePath = "data/ColorScheme.json"

export const myGui = new Gui()

export const chestamountgui = new Gui()

const CHANGELOG = `# §bPowdering v1.0.1\n ${FileLib.read("Powdering", "changelog.md")}`

config
.addSwitch({
    category: "Mining",
    configName: "powderDisplay",
    title: "Powder Display",
    description: "Shows how much powder you have of both gemstone and mithril",
    subcategory: "Crystal Hollows"
  })
.addSwitch({
    category: "Mining",
    configName: "mithrilDisplay",
    title: "Mithril Display",
    description: "Shows how much mithril powder you have",
    subcategory: "Crystal Hollows",
    shouldShow(config) {
        return config.powderDisplay
    }
  })
.addSwitch({
    category: "Mining",
    configName: "gemstoneDisplay",
    title: "Gemstone Display",
    description: "Shows how much gemstone powder you have",
    subcategory: "Crystal Hollows",
    shouldShow(config) {
        return config.powderDisplay
    }
})
.addSwitch({
    category: "Mining",
    configName: "glaciteDisplay",
    title: "Glacite Display",
    description: "Shows how much glacite powder you have (Note that this only works in the glacite tunnels/dwarven mines!)",
    subcategory: "Crystal Hollows",
    shouldShow(config) {
        return config.powderDisplay
    }
})
.addButton({
    category: "Mining",
    configName: "powderGui",
    title: "Powder GUI",
    description: "Move the position of the powder info",
    subcategory: "Crystal Hollows",
    onClick() {
        myGui.open()
    },
    shouldShow(config) {
        return config.powderDisplay
    }
})
.addSwitch({
    category: "Mining",
    configName: "twoxNotifier",
    title: "2x Notfier",
    description: "Notifies you when the 2x powder event becomes active",
    subcategory: "Crystal Hollows"
})
.addSwitch({
    category: "Mining",
    configName: "abilityNotifiers",
    title: "Ability Notifiers",
    description: "Vein Seeker and Pickobulous notifiers",
    subcategory: "Crystal Hollows"
})
.addSwitch({
    category: "Mining",
    configName: "pickobulousNotifier",
    title: "Pickobulous Notifier",
    description: "Notifies you your pickobulous ability is ready",
    subcategory: "Crystal Hollows",
    shouldShow(config) {
        return config.abilityNotifiers
    }
})
.addSwitch({
    category: "Mining",
    configName: "veinSeekerNotifier",
    title: "Vein Seeker Notifier",
    description: "Notifies you your vein seeker ability is ready",
    subcategory: "Crystal Hollows",
    shouldShow(config) {
        return config.abilityNotifiers
    }
})
.addSwitch({
    category: "Mining",
    configName: "pickobulousOverNotifier",
    title: "Pickobulous Over Notifier",
    description: "Notifies you your pickobulous ability is over",
    subcategory: "Crystal Hollows",
    shouldShow(config) {
        return config.pickobulousNotifier
    }
})
.addSwitch({
    category: "Mining",
    configName: "veinSeekerOverNotifier",
    title: "Vein Seeker Over Notifier",
    description: "Notifies you your vein seeker ability is over",
    subcategory: "Crystal Hollows",
    shouldShow(config) {
        return config.veinSeekerNotifier
    }
})
.addSwitch({
    category: "Mining",
    configName: "chestTracker",
    title: "Chest Tracker",
    description: "Shows how many chests you have opened in your current lobby",
    subcategory: "Crystal Hollows"
})
.addButton({
    category: "Mining",
    configName: "chestTrackerGui",
    title: "Chest Tracker GUI",
    description: "Move the position of the chest info",
    subcategory: "Crystal Hollows",
    onClick() {
        chestamountgui.open()
    },
    shouldShow(config) {
        return config.chestTracker
    }
})
.addSwitch({
    category: "Mining",
    configName: "chestSpawnNotifier",
    title: "Chest Spawn Notifier",
    description: "Notifies you when a treasure chest spawns",
    subcategory: "Crystal Hollows"
})
.addSwitch({
    category: "Mining",
    configName: "goldenGoblinNotifier",
    title: "Golden Goblin Notifier",
    description: "Notifies you when a golden goblin spawns",
    subcategory: "Crystal Hollows"
})

const setting = new Settings("Powdering", config, schemePath)
    .setCommand("powdering", ["powders"])

    .addMarkdown("Changelog", CHANGELOG)

// export
export default () => setting.settings