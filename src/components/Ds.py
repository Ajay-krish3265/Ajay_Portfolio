import pandas as pd

data = {
    'Name': ['Jai', 'Princi', 'Gaurav', 'Anuj',
             'Ravi', 'Natasha', 'Riya'],

    'Age': [17, 17, 18, 17, 18, 17, 17],

    'Gender': ['M', 'F', 'M', 'M', 'M', 'F', 'F'],

    'Marks': [90, 76, 'NaN', 74, 65, 'NaN', 71]
}

df = pd.DataFrame(data)
print(df)