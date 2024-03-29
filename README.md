# ArcherDuel
Calculate optimal turn in duel of two archers

В течение дуэли у лучников пропорционально возрастают точность V, но в то же вермя пропорционально уменьшается вероятность промазать (1 - V). 
Опитимальным ходом будем считать первый ход, в котором шанс попасть выше, чем шанс противника промазать, т.е. 
V1 > 1 - V2, 
где V1 - вероятность попадания для первого лучника, V2 - для второго. 

На каждом ходу один лучник действует первым, второй - после первого. Если первый лучник выберет действие "шаг вперед", то второму лучнику следует рассматривать шанс первого промазать в следующем ходу.
Обозначим номер хода как n.
Для первого лучника оптимальный ход будет, когда:
V1[n] > 1 - V2[n], 
для второго:
V2[n] > 1 - V1[n+1].

Преимущество данног алгоритма в том, что он не требует сложных вычислений, и не требует вводить дополнительные критерии оптимальности, оперируя только исходными данными.

Описание алгоритма:
1. Согласно воодным данным просчитываем матрицу вероятностей попасть и промазать для каждого лучника.
2. Для каждого хода, кроме изначального проверяем условия лучшего хода. Поскольку данных по новому коду еще нет, проверяем ретроспективно: смотрим данные по предыдущему и текущему ходу.
    2.1. Проверяем для первого лучника условие победы V1[n] > 1 - V2[n] и отсутствие найденного оптимального хода. Если условие выполняется - текущий ход является оптимальным для первого.
    2.1. Проверяем для второго лучника условие победы V2[n] > 1 - V1[n+1] и отсутствие найденного оптимального хода. Если условие выполняется - текущий ход является оптимальным для второго.
3. Возвращаем полученные значения оптимальных ходов.

Возможность ввода заданного диапазона точностей (от 0,1 до 0,3) я ограничил при помощи атрибутов полей ввода числа в форме ввода исходных данных.