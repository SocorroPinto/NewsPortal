import React, { Component } from "react";
import axios from "axios";
import "./StockInfo.css";
const STOCK_API_KEY = 'NPPN742APUQQCUCU';
const myMainUrl = 'https://www.alphavantage.co/query?';

const functions = { search: 'SYMBOL_SEARCH', 
                    time_series: 'TIME_SERIES_INTRADAY'};
    //function=

class StockInfo extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            eFunction: functions.time_series,
            eSearch: functions.search,
            keywords: null,
            symbol: 'DE',
            interval: '5min',
            timer: null,
            stockInfo: null,
        }
    }
 
    bringStockInfo = async (pSymbol) => {
        let myStockUrl = `${myMainUrl}function=${this.state.eFunction}&symbol=${pSymbol}&interval=${this.state.interval}&apikey=${STOCK_API_KEY}`;
        let myStockInfo= await axios.get(myStockUrl);

        let myIdx = Object.keys(myStockInfo.data).indexOf('Time Series (5min)');
        let myInfo = Object.values(myStockInfo.data)[myIdx];
        let myStockInfoFirstSerie = null;

        if ( typeof myInfo !== 'undefined' ) {
            myStockInfoFirstSerie = Object.values(myInfo)[0];
        }

        this.setState({
            stockInfo: myStockInfoFirstSerie,
            symbol: pSymbol
        });
    }

    formatInfo = ( pInfo ) => {
        let myOpen = Number(Object.values(pInfo)[Object.keys(pInfo).indexOf('1. open')]);
        let myMin = Number(Object.values(pInfo)[Object.keys(pInfo).indexOf('2. high')]);
        let myMax = Number(Object.values(pInfo)[Object.keys(pInfo).indexOf('3. low')]);
        let myClose = Number(Object.values(pInfo)[Object.keys(pInfo).indexOf('4. close')]);
        let myEmoji = myClose > myOpen ? '🔼' : (myClose < myOpen ? '🔽' : '⏹') ;
        
        return (<div className="stockValues">
            <div className="stockPrice" >Price: {myClose} {myEmoji}</div>
            <div className="stockLowMax" >Low: {myMin} Max: {myMax}</div> 
        </div>);
    }

    componentDidMount = () => {
        this.bringStockInfo(this.state.symbol);
        this.timer = setInterval(() => {
            this.bringStockInfo(this.state.symbol);
        }, 10000000);
    }

    handleSearch = async (pKeywords) => {
        let myStockUrl = `${myMainUrl}function=${this.state.eSearch}&keywords=${pKeywords}&apikey=${STOCK_API_KEY}`;
        let mySymbolsInfo= await axios.get(myStockUrl);
        let mySymbol = null;

        if ( typeof mySymbolsInfo.data.bestMatches != 'undefined') {
            if ( mySymbolsInfo.data.bestMatches.length > 0 ) {
                mySymbol = mySymbolsInfo.data.bestMatches[0]['1. symbol'];
            }
        }
        
        if ( mySymbol ) {
            this.bringStockInfo(mySymbol);       
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }

    render() {

        let myDisplayedInfo = null;
        if ( typeof this.state.stockInfo !== 'undefined' && this.state.stockInfo !== null) {
            myDisplayedInfo = this.formatInfo(this.state.stockInfo);
        }
        

        return ( <div className="myStockInfo">
            <form className="myStockForm" action="Submit" onSubmit={ ((event) => {
                event.preventDefault();
                this.handleSearch(event.target.company.value);
                }) }>
                <label>Stock Search: </label>
                <input type="text" name="company" placeholder="Company Name"/>
            </form>
            {myDisplayedInfo}
        </div>);
    }
}

export default StockInfo;