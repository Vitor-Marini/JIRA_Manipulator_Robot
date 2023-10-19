import numpy as np
import cv2


def get_limits(color):
    """
    
    Brief: A função get_limits(color) tem como propósito calcular os limites superiores e inferiores
    para um cor específica doo espaço de cores HSV(Hue,Saturation,Value).


    1.1 Notes: A função get_limits(color) recebe uma cor como input.
    o argumento esperado é uma cor no espaço RGB (Red,Green,Blue)
    que é usada como espaço de cores padrão da biblioteca OpenCv
    A cor RGB é então convertida para o espaço HSV usando a função
    'cvtColor' , essa função recebe dois argumentos: A imagem , nesse caso uma única cor
    e a flag especificando o tipo de conversão cv2.COLOR_BGR2HSV.
    O Valor do Hue é extraido do espaço de cores HSV.
    A Matiz (Hue) é um valor que mensura a posição de cor no espectro , variando de 0 a 180.

    A função então verifica se o valor do matiz está dentro de um determinado intervalo.
    Se o valor da tonalidade for maior ou igual a 165, é considerada uma tonalidade vermelha. 
    Se o valor da tonalidade for menor ou igual a 15, também é considerado uma tonalidade vermelha. 
    Isso ocorre porque os valores de matiz do vermelho no espaço de cores HSV podem variar de 180 a 0.

    
    Args: O Parâmetro color é um array numpy que representa a cor no espaço RGB
    É esperado que a cor seja um array numpy de 3 dimensões
        Example: 
        import numpy as np

        # Define a cor azul no espaço RGB.   
        color = np.uint8([[[0,0,255]]])

    o método np.uint8 é usado para garantir que os valores da cor estão
    no formato correto esperado pela função 'cvtColor', que espera valores
    que estão no range de um unsigned int de 8 bits.
    
    Return: A função retorna o limite inferior (lower bound) e superior (upper bound)
    como arrays numpy.

    
    1.2 Notes: Esses arrays serão utilizados no arquivo "ColorDetection.py"
    com a finalidade de criar uma 'Mask' (Máscara) de uma determinada cor específica
    no caso serão criadas Masks para as cores Vermelho , Verde e Azul.
    o método utilizado em 'ColorDetection.py'para criação dessas Masks será cv.InRange()
    
    **Use help(get_limits) para obter informações sobre a função.**
    
    """
    
    # RGB color
    c = np.uint8([[color]]) 
    hsvC = cv2.cvtColor(c, cv2.COLOR_BGR2HSV)

    # Get Hue value
    hue = hsvC[0][0][0]  

    # Handle red hue wrap-around
    if hue >= 165:  # Upper limit for divided red hue
        lowerLimit = np.array([hue - 10, 100, 100], dtype=np.uint8)
        upperLimit = np.array([180, 255, 255], dtype=np.uint8)
    elif hue <= 15:  # Lower limit for divided red hue
        lowerLimit = np.array([0, 100, 100], dtype=np.uint8)
        upperLimit = np.array([hue + 10, 255, 255], dtype=np.uint8)
    else:
        lowerLimit = np.array([hue - 10, 100, 100], dtype=np.uint8)
        upperLimit = np.array([hue + 10, 255, 255], dtype=np.uint8)

    return lowerLimit, upperLimit