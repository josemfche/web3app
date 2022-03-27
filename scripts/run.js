const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners()
    const tweetContractFactory = await hre.ethers.getContractFactory('TweetPortal')
    const tweetContract = await tweetContractFactory.deploy()
    await tweetContract.deployed()

    console.log('Contract deployed to: ', tweetContract.address)
    console.log('Contract deployed by: ', owner.address)

    let tweetCount
    tweetCount = await tweetContract.getTotalTweets()

    let tweetTxn = await tweetContract.tweet()
    await tweetTxn.wait()

    tweetTxn = await tweetContract.connect(randomPerson).tweet()
    await tweetTxn.wait()

    tweetCount = await tweetContract.getTotalTweets()
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()