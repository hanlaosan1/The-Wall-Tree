let modInfo = {
	name: "时时间间墙墙树",
	author: "hanlaosan",
	pointsName: "time",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 114514,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.?!??",
	name: "膨胀墙升级",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `<img src=\"s297.gif\" width=\"50\" height=\"50\"><br>有bug反馈到我的qq：1763786760`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade('w',12)) gain=gain.times(upgradeEffect('w',12))
	if(hasUpgrade('w',21)) gain=gain.times(3)
	if(inChallenge('w',11)||inChallenge('w',13)) gain=gain.div(10)
	if(hasChallenge('w',11)) gain=gain.times(9)
	if(hasChallenge('w',13)) gain=gain.pow(1.05)
	if(inChallenge('w',14)) gain=gain.pow(0.01)
	if(hasUpgrade('w',32)) gain=gain.times(upgradeEffect('w',32))
	if(hasUpgrade('w',41)) gain=gain.times(buyableEffect('w',11))
	if(hasMilestone('d',1)) gain=gain.times(100)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	
}}

// Display extra things at the top of the page
var displayThings = ["当前版本终局:1000膨胀墙"
]

// Determines when the game "ends"
function isEndgame() {
	return hasMilestone('d',8)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(100000000000000000000) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}