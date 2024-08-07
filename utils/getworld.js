export function getWorld() {
    let area = 'null'
    try {
        TabList?.getNames()?.forEach(line => {
            let match = line.removeFormatting().match(/Area: (.+)/)
            if (!match) return
            area = match[1]
        })
    } catch (e) { }
    return area
}