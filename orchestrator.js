function scan(ns, parent, server, list) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        list.push(child);
        
        scan(ns, server, child, list);
    }
}

export function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    return list;
}

/** @param {NS} ns **/
export async function main(ns) {

	const servers = list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);
    for(const server of servers) {
        const used = ns.getServerUsedRam(server);
        const max = ns.getServerMaxRam(server);
        const free = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
        ns.tprint(`${server} is opened. ${used} GB / ${max} GB (${(100*used/max).toFixed(2)}%)`)
    }
}