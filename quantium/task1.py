import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import ttest_ind

df = pd.read_excel("QVI_transaction_data.xlsx")
cust = pd.read_csv("QVI_purchase_behaviour.csv")


print(df.head())
print(df.info())
print(df.describe())
"""
The DF has no missing values, the data types are generally reasonable, but the date is not in a normal date format.
The PROD_QTY transaction table contains outliers, and the TOT_SALES table also contains abnormally high values.
The vast majority of transactions are small retail transactions.
"""
print(cust.head())
print(cust.info())
print(cust.describe(include='all'))
"""
CUST is a customer segmentation table.
The customer table also does not have missing values; each row represents a customer, not a transaction.
"""
df["DATE"] = pd.to_datetime(df["DATE"], origin="1899-12-30", unit="D")
print(df.head())
"""
DATE form change
"""
print(df["PROD_NAME"].head(20))
print(df["PROD_NAME"].nunique())
"""
114 total with something which is not chip
"""
words = (
    df["PROD_NAME"]
    .drop_duplicates()      
    .str.split()            
    .explode()              
    .str.lower()            
)
words = words[~words.str.contains(r"\d", na=False)]  
words = words[words.str.isalpha()]     
print(words.value_counts().head(30))             
'''
ord frequency analysis of product names revealed that while most items are chips, there are some non-chip products such as salsa present in the dataset.
'''
df = df[~df["PROD_NAME"].str.lower().str.contains("salsa", na=False)]

print(df.isnull().sum())
print(df.describe())
'''
Viewing outliers
'''

outlier_txn = df[df["PROD_QTY"] == 200]
print(outlier_txn)

outlier_customer = outlier_txn["LYLTY_CARD_NBR"].unique()
print(df[df["LYLTY_CARD_NBR"].isin(outlier_customer)].sort_values(["LYLTY_CARD_NBR", "DATE"]))
'''
Checking outliers
An outlier was identified where a customer purchased 200 units in a single transaction. Further investigation showed that this customer only made one or two transactions throughout the year, 
suggesting that they are not a typical retail customer but rather a bulk purchaser. Therefore, this customer was excluded from the analysis to ensure the results reflect normal consumer behavior.
'''

df = df[~df["LYLTY_CARD_NBR"].isin(outlier_customer)]
print(df["PROD_QTY"].describe())
'''
Delete outlier and doublecheck
'''

transactions_by_day = df.groupby("DATE").size().reset_index(name="N")
print(transactions_by_day.head())
print(transactions_by_day.shape)
'''
Daily trends check
'''
full_dates = pd.DataFrame({
    "DATE": pd.date_range(start="2018-07-01", end="2019-06-30", freq="D")
})
transactions_by_day = full_dates.merge(transactions_by_day, on="DATE", how="left")
transactions_by_day["N"] = transactions_by_day["N"].fillna(0)
'''
Full daily data
'''

zero_days = transactions_by_day[transactions_by_day["N"] == 0]
print(zero_days["DATE"])

plt.figure(figsize=(12, 4))
plt.plot(transactions_by_day["DATE"], transactions_by_day["N"])
plt.title("Transactions over time")
plt.xlabel("Date")
plt.ylabel("Number of transactions")
plt.xticks(rotation=90)
plt.show()
'''
draw and check for missing dates and identify seasonal variations.
'''

dec_data = transactions_by_day[
    (transactions_by_day["DATE"] >= "2018-12-01") &
    (transactions_by_day["DATE"] <= "2018-12-31")
]

plt.figure(figsize=(12, 4))
plt.plot(dec_data["DATE"], dec_data["N"])
plt.title("Transactions in December 2018")
plt.xlabel("Date")
plt.ylabel("Number of transactions")
plt.xticks(rotation=90)
plt.show()
'''
Pay attention to relevant dates in December to explain the pre-Christmas growth and the zero growth on Christmas Day.
'''


df["PACK_SIZE"] = df["PROD_NAME"].str.extract(r"(\d+)").astype(float)
print(df["PACK_SIZE"].value_counts().sort_index())
'''
Extract the number from PROD_NAME as PACK_SIZE and check if the range is reasonable.
'''


pack_counts = df["PACK_SIZE"].value_counts().sort_index()

plt.figure(figsize=(10, 4))
plt.bar(pack_counts.index.astype(str), pack_counts.values)
plt.title("Number of transactions by pack size")
plt.xlabel("Pack size")
plt.ylabel("Transaction count")
plt.xticks(rotation=90)
plt.show()
'''
Pack size distribution map
'''

df["BRAND"] = df["PROD_NAME"].str.split().str[0].str.upper()
print(df["BRAND"].value_counts())
'''
Check brand
'''

df["BRAND"] = df["BRAND"].replace({
    "RED": "RRD",
    "SNBTS": "SUNBITES",
    "INFZNS": "INFUZIONS",
    "WW": "WOOLWORTHS",
    "SMITH": "SMITHS"
})
print(df["BRAND"].value_counts())
'''
Clear brand and doublecheck
'''


data = df.merge(cust, on="LYLTY_CARD_NBR", how="left")
print(data.shape)
print(data[["LIFESTAGE", "PREMIUM_CUSTOMER"]].isnull().sum())
'''
The final analysis table was generated, confirming that no data was lost during merging.
'''

sales_seg = (
    data.groupby(["LIFESTAGE", "PREMIUM_CUSTOMER"])["TOT_SALES"]
    .sum()
    .reset_index()
)
print(sales_seg.sort_values("TOT_SALES", ascending=False))

pivot_sales = sales_seg.pivot(index="LIFESTAGE", columns="PREMIUM_CUSTOMER", values="TOT_SALES")
pivot_sales.plot(kind="bar", figsize=(10, 5))
plt.title("Total sales by customer segment")
plt.ylabel("Total sales")
plt.xticks(rotation=45)
plt.show()
'''
Summarize total sales by LIFESTAGE and PREMIUM_CUSTOMER, and draw a graph to identify the main contributing groups.
'''

cust_count = (
    data.groupby(["LIFESTAGE", "PREMIUM_CUSTOMER"])["LYLTY_CARD_NBR"]
    .nunique()
    .reset_index(name="CUSTOMER_COUNT")
)

print(cust_count.sort_values("CUSTOMER_COUNT", ascending=False))
'''
Count the number of customers in each segment to determine if high sales are due to a large number of customers.
'''

units_per_customer = (
    data.groupby(["LIFESTAGE", "PREMIUM_CUSTOMER"])
    .agg(total_units=("PROD_QTY", "sum"),
         customer_count=("LYLTY_CARD_NBR", "nunique"))
    .reset_index()
)

units_per_customer["avg_units_per_customer"] = (
    units_per_customer["total_units"] / units_per_customer["customer_count"]
)

print(units_per_customer.sort_values("avg_units_per_customer", ascending=False))
'''
Looking at the average units per customer, we found that older families and younger families buy more.
'''

data["PRICE_PER_UNIT"] = data["TOT_SALES"] / data["PROD_QTY"]
price_seg = (
    data.groupby(["LIFESTAGE", "PREMIUM_CUSTOMER"])["PRICE_PER_UNIT"]
    .mean()
    .reset_index()
)

print(price_seg.sort_values("PRICE_PER_UNIT", ascending=False))
'''
Looking at the average price per pack across different segments, we found that mainstream young and middle-aged singles/couples are willing to pay a higher price per pack.
'''



group1 = data[
    (data["LIFESTAGE"].isin(["YOUNG SINGLES/COUPLES", "MIDAGE SINGLES/COUPLES"])) &
    (data["PREMIUM_CUSTOMER"] == "Mainstream")
]["PRICE_PER_UNIT"]

group2 = data[
    (data["LIFESTAGE"].isin(["YOUNG SINGLES/COUPLES", "MIDAGE SINGLES/COUPLES"])) &
    (data["PREMIUM_CUSTOMER"].isin(["Budget", "Premium"]))
]["PRICE_PER_UNIT"]

t_stat, p_val = ttest_ind(group1, group2, equal_var=False)
print(t_stat, p_val)
'''
T-TEST
'''

target = data[
    (data["LIFESTAGE"] == "YOUNG SINGLES/COUPLES") &
    (data["PREMIUM_CUSTOMER"] == "Mainstream")
]

brand_pref = target["BRAND"].value_counts(normalize=True).reset_index()
brand_pref.columns = ["BRAND", "TARGET_PROP"]

overall_brand = data["BRAND"].value_counts(normalize=True).reset_index()
overall_brand.columns = ["BRAND", "OVERALL_PROP"]

brand_compare = brand_pref.merge(overall_brand, on="BRAND", how="left")
brand_compare["AFFINITY"] = brand_compare["TARGET_PROP"] / brand_compare["OVERALL_PROP"]

print(brand_compare.sort_values("AFFINITY", ascending=False))
'''
Mainstream - Do young singles/couples prefer certain brands?
'''

pack_pref = target["PACK_SIZE"].value_counts(normalize=True).reset_index()
pack_pref.columns = ["PACK_SIZE", "TARGET_PROP"]

overall_pack = data["PACK_SIZE"].value_counts(normalize=True).reset_index()
overall_pack.columns = ["PACK_SIZE", "OVERALL_PROP"]

pack_compare = pack_pref.merge(overall_pack, on="PACK_SIZE", how="left")
pack_compare["AFFINITY"] = pack_compare["TARGET_PROP"] / pack_compare["OVERALL_PROP"]

print(pack_compare.sort_values("AFFINITY", ascending=False))
'''
See if the target customer group prefers certain packaging sizes.
'''