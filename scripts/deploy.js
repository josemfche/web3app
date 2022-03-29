main = async () => {
    const [deployer] = await hre.ethers.getSigners()
    const accountBalance = await deployer.getBalance()

    console.log('Deploying contracts with account: ', deployer.address)
    console.log('Account balance: ', accountBalance.toString())

    const tweetContractFactory = await hre.ethers.getContractFactory('TweetPortal')
    const tweetContract = await tweetContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    })
    await tweetContract.deployed()

    console.log('TweetPortal address: ', tweetContract.address)
}

const runMain = async () => {
    try {
        await main ()
        process.exit(0)
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()