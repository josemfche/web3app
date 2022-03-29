const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners()
    const tweetContractFactory = await hre.ethers.getContractFactory('TweetPortal')
    const tweetContract = await tweetContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    })
    await tweetContract.deployed()

    console.log('Contract deployed to: ', tweetContract.address)
    console.log('Contract deployed by: ', owner.address)

    /*
   * Get Contract balance
   */
    let contractBalance = await hre.ethers.provider.getBalance(
        tweetContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let tweetCount
    tweetCount = await tweetContract.getTotalTweets()

    let tweetTxn = await tweetContract.tweet('Hello, tweet')
    await tweetTxn.wait()

    tweetTxn = await tweetContract.connect(randomPerson).tweet('Nope, no thakns')
    await tweetTxn.wait()

    contractBalance = await hre.ethers.provider.getBalance(tweetContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    tweetCount = await tweetContract.getTotalTweets()
    let tweetTotal = await tweetContract.getAllTweets()
    console.log(tweetTotal)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()