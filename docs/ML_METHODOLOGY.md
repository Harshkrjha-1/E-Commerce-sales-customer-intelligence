# Machine Learning Methodology

## 1. Historical Snapshot Design (Target Leakage Prevention)
- **Snapshot Date**: `2018-03-01`
- **Feature Window**: All customer orders on or before `2018-03-01`.
- **Target Observation Window**: 180 days post snapshot (`2018-03-01` to `2018-08-28`).
- **Target Variable (`is_inactive`)**:
  - `1` if customer placed ZERO purchases in the 180-day post-snapshot period.
  - `0` if customer placed 1 or more purchases in that period.

## 2. Models Trained & Evaluated
1. **Primary Model**: Logistic Regression (`class_weight='balanced'`, `random_state=42`).
2. **Comparison Model**: Random Forest Classifier (`n_estimators=100`, `max_depth=8`).

## 3. Performance Metrics
- **Accuracy**: 0.6280
- **Precision**: 0.9905
- **Recall**: 0.6296
- **F1 Score**: 0.7699
- **ROC-AUC**: 0.5829
- **Confusion Matrix**: `[[82, 84], [5138, 8735]]`
