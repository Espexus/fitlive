-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-12-2025 a las 16:37:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fitlive`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarExp` (IN `p_idusuario` INT, IN `p_exp` INT)   BEGIN 
	UPDATE usuarios SET exp = p_exp WHERE id = p_idusuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarIMC` (IN `p_idusuario` INT, IN `p_imc` FLOAT)   BEGIN 
	UPDATE usuarios SET imc = p_imc WHERE id = p_idusuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrarEntreno` (IN `p_identreno` INT)   BEGIN
	DELETE FROM entrenamientos WHERE id = p_identreno;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarIMC` (IN `p_idusuario` INT)   BEGIN 
	SELECT imc FROM usuarios WHERE id = p_idusuario;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerEntrenos` (IN `p_idusuario` INT)   BEGIN 
	SELECT id, fecha, intensidad, tiempo, tipo, grupoMuscular FROM entrenamientos
    WHERE usuario = p_idusuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerExp` (IN `p_idusuario` INT)   BEGIN
    	SELECT exp FROM usuarios WHERE id = p_idusuario;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registrarUsuario` (IN `p_alias` VARCHAR(90), IN `p_clave` VARCHAR(255), IN `p_correo` VARCHAR(255), IN `p_edad` INT, IN `p_pais` VARCHAR(90))   BEGIN 
	INSERT INTO usuarios (alias, clave, correo, edad, pais)
    VALUES (p_alias, p_clave, p_correo, p_edad, p_pais);
    SELECT LAST_INSERT_ID() AS id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registroEntrenos` (IN `p_idusuario` INT, IN `p_intensidad` SMALLINT, IN `p_tiempo` INT, IN `p_tipo` VARCHAR(32), IN `p_grupo` VARCHAR(32))   BEGIN 
	INSERT INTO entrenamientos (usuario, fecha, intensidad, tiempo, tipo, grupoMuscular)
    VALUES (p_idusuario, NOW(), p_intensidad, p_tiempo, p_tipo, p_grupo);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verificarLogin` (IN `p_alias` VARCHAR(90), IN `p_clave` VARCHAR(255))   BEGIN 
	SELECT id FROM usuarios
    WHERE alias = p_alias AND clave = p_clave;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verificarUsuarioExistente` (IN `p_alias` VARCHAR(90))   BEGIN 
	SELECT alias FROM usuarios
    WHERE alias = p_alias;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenamientos`
--

CREATE TABLE `entrenamientos` (
  `id` int(11) NOT NULL,
  `usuario` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `tiempo` int(11) DEFAULT NULL,
  `intensidad` smallint(6) DEFAULT NULL,
  `tipo` varchar(32) NOT NULL,
  `grupoMuscular` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrenamientos`
--

INSERT INTO `entrenamientos` (`id`, `usuario`, `fecha`, `tiempo`, `intensidad`, `tipo`, `grupoMuscular`) VALUES
(1, 3, '2025-11-21 23:56:05', 24, 2, 'Cardiovascular', 'general'),
(2, 3, '2025-11-22 00:15:22', 23, 3, 'Cardiovascular', 'Hombros y espalda'),
(3, 3, '2025-11-22 00:15:48', 20, 2, 'Cardiovascular', 'General'),
(4, 3, '2025-11-22 00:17:08', 4, 1, 'Cardiovascular', 'Abdomen'),
(5, 5, '2025-11-22 02:01:50', 24, 3, 'Cardiovascular', 'Hombros y espalda'),
(6, 5, '2025-11-22 02:01:59', 56, 2, 'Cardiovascular', 'Pecho'),
(7, 5, '2025-11-22 02:02:07', 56, 4, 'Pesas', 'Hombros y espalda'),
(8, 5, '2025-11-22 02:03:24', 23, 1, 'Pesas', 'Hombros y espalda'),
(9, 5, '2025-11-22 02:04:38', 24, 2, 'Pesas', 'General'),
(10, 6, '2025-11-22 02:07:41', 25, 3, 'Pesas', 'Hombros y espalda'),
(11, 6, '2025-11-22 02:07:55', 12, 4, 'Deportes', 'General'),
(12, 6, '2025-11-22 02:08:39', 222, 5, 'Deportes', 'General'),
(13, 6, '2025-11-22 02:09:05', 750, 5, 'Pesas', 'Pecho'),
(14, 6, '2025-11-22 02:10:26', 3400, 5, 'Pesas', 'Hombros y espalda'),
(15, 3, '2025-11-25 13:16:57', 60, 4, 'Pesas', 'Hombros y espalda'),
(16, 8, '2025-11-25 13:21:12', 500, 5, 'Cardiovascular', 'Hombros y espalda'),
(17, 9, '2025-12-16 01:06:25', 24, 1, 'Pesas', 'Pecho'),
(18, 9, '2025-12-16 01:06:36', 35, 3, 'Deportes', 'Pecho'),
(19, 9, '2025-12-16 01:38:07', 560, 5, 'Pesas', 'General');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `alias` varchar(20) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `correo` varchar(255) NOT NULL,
  `pais` varchar(90) DEFAULT NULL,
  `imc` float DEFAULT NULL,
  `exp` int(11) DEFAULT 0,
  `clave` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `alias`, `edad`, `correo`, `pais`, `imc`, `exp`, `clave`) VALUES
(1, 'juan', 20, 'j@j.com', 'CO', NULL, 0, '123'),
(2, 'Xepraz', NULL, 'micorreo@gmail.com', NULL, NULL, 0, 'ppp'),
(3, 'Creador', NULL, 'micorreo@gmail.com', NULL, 25.25, 274, 'Griezmann1001'),
(4, 'Kiko', NULL, 'micorreo@gmail.com', NULL, 22.22, 0, 'cachetes'),
(5, 'Chavo', NULL, 'micorreo@gmail.com', NULL, 20.23, 48, 'elchavito'),
(6, 'Gabriel', NULL, 'micorreo@gmail.com', NULL, 20.23, 21983, 'gabo'),
(7, 'Jesus', NULL, 'micorreo@gmail.com', NULL, NULL, 0, 'jhve'),
(8, 'alberto', NULL, 'micorreo@gmail.com', NULL, NULL, 2500, 'alberto'),
(9, 'admin', NULL, 'jesusespinosa10usb@gmail.com', NULL, 21.6, 2929, '123admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `entrenamientos`
--
ALTER TABLE `entrenamientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entrenamientos`
--
ALTER TABLE `entrenamientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `entrenamientos`
--
ALTER TABLE `entrenamientos`
  ADD CONSTRAINT `entrenamientos_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
