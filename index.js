import { registerWhen } from "../BloomCore/utils/Utils";
import config, { myGui, chestamountgui } from "./Config";
import { data } from "./utils/data";
import { getWorld } from "./utils/getworld";

let gemstoneInfo = '';
let mithrilInfo = '';
let glaciteInfo = '';

const extractGlaciteInfo = () => {
    try {
        TabList?.getNames()?.forEach(line => {
            let match = line.removeFormatting().match(/Glacite:\s*(.+)/);
            if (match) {
                glaciteInfo = match[1];
            }
        });
    } catch (e) {
        glaciteInfo = '';
    }
};

const extractGemstoneInfo = () => {
    try {
        TabList?.getNames()?.forEach(line => {
            let match = line.removeFormatting().match(/Gemstone:\s*(.+)/);
            if (match) {
                gemstoneInfo = match[1];
            }
        });
    } catch (e) {
        gemstoneInfo = '';
    }
};

const extractMithrilInfo = () => {
    try {
        TabList?.getNames()?.forEach(line => {
            let match = line.removeFormatting().match(/Mithril:\s*(.+)/);
            if (match) {
                mithrilInfo = match[1];
            }
        });
    } catch (e) {
        mithrilInfo = '';
    }
};

const isInDwarvenMinesOrCrystalHollows = () => {
    const world = getWorld();
    return world === 'Dwarven Mines' || world === 'Crystal Hollows';
};

register("tick", () => {
    if (isInDwarvenMinesOrCrystalHollows()) {
        extractGemstoneInfo();
        extractMithrilInfo();
        extractGlaciteInfo();
    }
});

register("dragged", (mx, my, x, y) => {
    if (!myGui.isOpen()) return;
    data.powderAmounts.x = x;
    data.powderAmounts.y = y;
    data.save();
});

registerWhen(register("renderOverlay", () => {
    if (!config().powderDisplay) return;
    let infoString = '';
    if (config().mithrilDisplay) {
        infoString += `&2&lMithril Info: ${mithrilInfo}\n`;
    }
    if (config().gemstoneDisplay) {
        infoString += `&d&lGemstone Info: ${gemstoneInfo}\n`;
    }
    if (config().glaciteDisplay) {
        infoString += `&b&lGlacite Info: ${glaciteInfo}\n`;
    }
    Renderer.drawString(infoString, data.powderAmounts.x, data.powderAmounts.y);
}), () => config().powderDisplay && isInDwarvenMinesOrCrystalHollows());

register("chat", () => {
    if (config().twoxNotifier) {
                Client.showTitle('&4&l2X POWDER!!!!!', "", 10, 100, 10);
    }
}).setChatCriteria("                          2X POWDER STARTED!");

register("chat", () => {
    if (config().pickobulousNotifier) {
                Client.showTitle('&4&lPickobulous Available', "", 10, 100, 10);
    }
}).setChatCriteria("Pickobulous is now available!");

register("chat", () => {
    if (config().veinSeekerNotifier) {
                Client.showTitle('&4&lVein Seeker Available', "", 10, 100, 10);
    }
}).setChatCriteria("Vein Seeker is now available!");

register("chat", () => {
    if (config().pickobulousOverNotifier) {
                Client.showTitle('&4&lPickobulous Over', "", 10, 100, 10);
    }
}).setChatCriteria("Your Pickobulous has expired!");

register("chat", () => {
    if (config().veinSeekerOverNotifier) {
                Client.showTitle('&4&lVein Seeker Over', "", 10, 100, 10);
    }
}).setChatCriteria("Your Vein Seeker has expired!");

let specificMessageCount = 0;
let previousWorld = getWorld();

register("chat", (message) => {
    specificMessageCount++;
}).setChatCriteria("  CHEST LOCKPICKED ");

register("tick", () => {
    const currentWorld = getWorld();
    if (currentWorld !== previousWorld) {
        specificMessageCount = 0;
        previousWorld = currentWorld;
    }
});

register("dragged", (mx, my, x, y) => {
    if (!chestamountgui.isOpen()) return;
    data.chestCords.x = x;
    data.chestCords.y = y;
    data.save();
});

registerWhen(register("renderOverlay", () => {
    if (!config().chestTracker) return;
    let chestText = specificMessageCount === 1 ? "Chest" : "Chests";
    Renderer.drawString(`&b&l${specificMessageCount.toString()} ${chestText} Found!`, data.chestCords.x, data.chestCords.y);
}), () => config().chestTracker && isInDwarvenMinesOrCrystalHollows());

register("chat", () => {
    if (config().chestSpawnNotifier) {
                Client.showTitle('&b&lChest!', "", 10, 30, 10);
    }
}).setChatCriteria("You uncovered a treasure chest!");

register("chat", () => {
    if (config().goldenGoblinNotifier) {
                Client.showTitle('&e&Golden Goblin!', "", 10, 100, 10);
    }
}).setChatCriteria("A Golden Goblin has spawned!");