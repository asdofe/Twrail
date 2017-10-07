
用這一個專案改的
https://github.com/asdofe/node-react-webpack-sample


打算用Node當後端React當前端搞一個火車時刻表的webApp
我先寫後端...

---

## RDB Schema

|train_time_table|
|---|
|id:這張表的pk
|train_id:車次編號
|arr_t:到達時間
|dep_t:離開時間
|order:順序
|route:保留欄位
|hash:hash確認來自哪個檔案
|update_t:資料插入的時間

