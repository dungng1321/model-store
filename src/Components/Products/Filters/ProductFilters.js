import { useState, useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import Slider from '@mui/material/Slider';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import * as sharedFunction from './_functions';
import { setIsOpenFilter } from '../../../redux/userSlice';


function ProductFilters() {
    /**
     * *availability filter
     */
    const [availability, setAvailability] = useState({
        neww: false,
        preOrder: false,
    })

    const handleChange = (event) => {
        setAvailability({
            ...availability,
            [event.target.name]: event.target.checked,
        });
        // console.log('name', event.target.name, 'value', event.target.checked);
    };
    const { neww, preOrder } = availability;

    /**
     * *category
     */
    const [category, setCategory] = useState(
        sharedFunction.categories
    )

    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => setShowMore(prev => !prev)

    const handleChangeCategory = (event) => {
        setCategory({
            ...category,
            [event.target.name]: event.target.checked,
        });
        // console.log("name", event.target.name, "val: ", event.target.checked);
    };
    const { dragonBall, onePiece, naruto, myHeroAcademy, demonSlayer, jujutsuKaisen
        , marvel, dc, genshin, nendoroid, transformer } = category;

    /**
     * *price
     */
    const [min, setMin] = useState(100000);
    const [max, setMax] = useState(10000000);

    // const handleChangePrice2 = (event, newValue, activeThumb) => {
    //     if (!Array.isArray(newValue)) {
    //         return;
    //     }

    //     if (activeThumb === 0) {
    //         setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    //     } else {
    //         setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    //     }
    // };

    const handleChangePrice = (event, newValue) => {
        setMin(newValue[0]);
        setMax(newValue[1]);
    };

    // function valuetext(value) {
    //     return `${value}°C`;
    // }
    // const minDistance = 100000;

    function handleFilterPrice(minVal, maxVal) {
        console.log("min: ", minVal, "max: ", maxVal);
    }

    /**
     * *company
     */
    const [company, setCompany] = useState(
        sharedFunction.companies
    )

    const [showMoreComp, setShowMoreComp] = useState(false);

    const handleShowMoreComp = () => setShowMoreComp(prev => !prev)

    const handleChangeCompany = (event) => {
        setCompany({
            ...company,
            [event.target.name]: event.target.checked,
        });
        console.log("name", event.target.name, "val: ", event.target.checked);
    };
    const { bandai, taito, bellfine, kotobukiya, takaraTomy, f4Figures
        , banpresto, prime1Studio, fURYUCorporation, estream, gSCompany
        , hEXCollectibles, megaHouse, jimeiPalace, aniplex, wonderfulWorks
        , aPEX, miHoYo, maxFactory, threezero, sentinel, threeAToys
        , sideshowCollectibles, hotToys, ironStudios, tweeterhead
        , } = company;

    /**
     * *animation fiilter
     */

   //use redux,
   const userStore = useSelector((state) => state.user)
   const dispatch = useDispatch();

    const handleCloseFilter = () => {
        dispatch(setIsOpenFilter(false))
    }

    return (
        <>
            <div
                className={userStore.isOpenFilter ? "filter-mobile" : "products-filters"}>
                <AnimatePresence exitBeforeEnter>
                    <div
                        key={1}
                    >
                        {userStore.isOpenFilter && (
                            <div className="mobile-header">
                                <h2>Bộ lọc</h2>
                                <CloseIcon
                                    className="close-filter-btn"
                                    onClick={() => handleCloseFilter()} />
                            </div>
                        )}
                        <div className="availability">
                            <FormControl component="fieldset" variant="standard">
                                <h3>Trạng thái</h3>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={{
                                                    color: '#d0d2d4',
                                                    '&.Mui-checked': {
                                                        color: '#2c88cc',
                                                    },
                                                }}
                                                checked={neww}
                                                onChange={handleChange}
                                                name="neww" />
                                        }
                                        label="Mới"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox sx={{
                                                color: '#d0d2d4',
                                                '&.Mui-checked': {
                                                    color: '#2c88cc',
                                                },
                                            }}
                                                checked={preOrder} onChange={handleChange} name="preOrder" />
                                        }
                                        label="Đặt trước"
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>
                        <div className="category">
                            <FormControl component="fieldset" variant="standard">
                                <h3 style={{ marginTop: '30px' }}>Danh mục</h3>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox sx={{
                                                color: '#d0d2d4',
                                                '&.Mui-checked': {
                                                    color: '#2c88cc',
                                                },
                                            }}
                                                checked={dragonBall} onChange={handleChangeCategory} name="dragonBall" />
                                        }
                                        label="Dragon Ball"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox sx={{
                                                color: '#d0d2d4',
                                                '&.Mui-checked': {
                                                    color: '#2c88cc',
                                                },
                                            }}
                                                checked={onePiece} onChange={handleChangeCategory} name="onePiece" />
                                        }
                                        label="One Piece"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox sx={{
                                                color: '#d0d2d4',
                                                '&.Mui-checked': {
                                                    color: '#2c88cc',
                                                },
                                            }}
                                                checked={naruto} onChange={handleChangeCategory} name="naruto" />
                                        }
                                        label="Naruto"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox sx={{
                                                color: '#d0d2d4',
                                                '&.Mui-checked': {
                                                    color: '#2c88cc',
                                                },
                                            }}
                                                checked={myHeroAcademy} onChange={handleChangeCategory} name="myHeroAcademy" />
                                        }
                                        label="My Hero Academia"
                                    />
                                    <AnimatePresence >
                                        {showMore && (
                                            <motion.div
                                                className="sub-category"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={demonSlayer} onChange={handleChangeCategory} name="demonSlayer" />
                                                    }
                                                    label="Demon Slayer"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={jujutsuKaisen} onChange={handleChangeCategory} name="jujutsuKaisen" />
                                                    }
                                                    label="Jujutsu Kaisen"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={marvel} onChange={handleChangeCategory} name="marvel" />
                                                    }
                                                    label="Marvel"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={dc} onChange={handleChangeCategory} name="dc" />
                                                    }
                                                    label="DC Comics"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={genshin} onChange={handleChangeCategory} name="genshin" />
                                                    }
                                                    label="Genshin Impact"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={nendoroid} onChange={handleChangeCategory} name="nendoroid" />
                                                    }
                                                    label="Nendoroid"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={transformer} onChange={handleChangeCategory} name="transformer" />
                                                    }
                                                    label="Transformer"
                                                />
                                            </motion.div>

                                        )}
                                    </AnimatePresence>
                                    <div className="showMore" onClick={handleShowMore}>
                                        {!showMore ? <AddIcon className="icon" /> : <RemoveIcon className="icon" />}
                                        {!showMore ? "Hiện thêm" : "Ẩn bớt"}
                                    </div>

                                </FormGroup>
                            </FormControl>
                        </div>
                        <div className="price">
                            <h3 style={{ marginTop: '40px', marginBottom: '10px' }}>Mức giá</h3>
                            <Slider
                                // getAriaLabel={() => 'Minimum distance'}
                                value={[min, max]}
                                min={100000}
                                max={10000000}
                                onChange={handleChangePrice}
                                valueLabelDisplay="auto"
                                // getAriaValueText={valuetext}
                                disableSwap
                            />
                            <div className="price-show">
                                <p>{sharedFunction.numberWithCommas(min)} ₫</p>
                                <span> <RemoveIcon /> </span>
                                <p>{sharedFunction.numberWithCommas(max)} ₫</p>
                            </div>
                            <div className="price-filter-btn" onClick={() => handleFilterPrice(min, max)}>
                                Lọc giá
                            </div>
                        </div>
                        <div className="company">
                            <FormControl component="fieldset" variant="standard">
                                <h3 style={{ marginTop: '40px' }}>Nhà sản xuất</h3>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox sx={{
                                                color: '#d0d2d4',
                                                '&.Mui-checked': {
                                                    color: '#2c88cc',
                                                },
                                            }}
                                                checked={bandai} onChange={handleChangeCompany} name="bandai" />
                                        }
                                        label="Bandai"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox sx={{
                                                color: '#d0d2d4',
                                                '&.Mui-checked': {
                                                    color: '#2c88cc',
                                                },
                                            }}
                                                checked={taito} onChange={handleChangeCompany} name="taito" />
                                        }
                                        label="Taito"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox sx={{
                                                color: '#d0d2d4',
                                                '&.Mui-checked': {
                                                    color: '#2c88cc',
                                                },
                                            }}
                                                checked={bellfine} onChange={handleChangeCompany} name="bellfine" />
                                        }
                                        label="Bellfine"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox sx={{
                                                color: '#d0d2d4',
                                                '&.Mui-checked': {
                                                    color: '#2c88cc',
                                                },
                                            }}
                                                checked={kotobukiya} onChange={handleChangeCompany} name="kotobukiya" />
                                        }
                                        label="Kotobukiya"
                                    />
                                    <AnimatePresence>
                                        {showMoreComp && (
                                            <motion.div
                                                className="sub-company"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={takaraTomy} onChange={handleChangeCompany} name="takaraTomy" />
                                                    }
                                                    label="Takara Tomy"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={f4Figures} onChange={handleChangeCompany} name="f4Figures" />
                                                    }
                                                    label="First 4 Figures"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={banpresto} onChange={handleChangeCompany} name="banpresto" />
                                                    }
                                                    label="Banpresto"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={prime1Studio} onChange={handleChangeCompany} name="prime1Studio" />
                                                    }
                                                    label="Prime 1 Studio"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={fURYUCorporation} onChange={handleChangeCompany} name="fURYUCorporation" />
                                                    }
                                                    label="FURYU Corporation"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={estream} onChange={handleChangeCompany} name="estream" />
                                                    }
                                                    label="Estream"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={gSCompany} onChange={handleChangeCompany} name="gSCompany" />
                                                    }
                                                    label="Good Smile Company"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={hEXCollectibles} onChange={handleChangeCompany} name="hEXCollectibles" />
                                                    }
                                                    label="HEX Collectibles"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={megaHouse} onChange={handleChangeCompany} name="megaHouse" />
                                                    }
                                                    label="MegaHouse"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={jimeiPalace} onChange={handleChangeCompany} name="jimeiPalace" />
                                                    }
                                                    label="Jimei Palace"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={aniplex} onChange={handleChangeCompany} name="aniplex" />
                                                    }
                                                    label="Aniplex"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={wonderfulWorks} onChange={handleChangeCompany} name="wonderfulWorks" />
                                                    }
                                                    label="Wonderful Works"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={aPEX} onChange={handleChangeCompany} name="aPEX" />
                                                    }
                                                    label="APEX"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={miHoYo} onChange={handleChangeCompany} name="miHoYo" />
                                                    }
                                                    label="miHoYo"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={maxFactory} onChange={handleChangeCompany} name="maxFactory" />
                                                    }
                                                    label="Max Factory"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={threezero} onChange={handleChangeCompany} name="threezero" />
                                                    }
                                                    label="Threezero"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={sentinel} onChange={handleChangeCompany} name="sentinel" />
                                                    }
                                                    label="Sentinel"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={threeAToys} onChange={handleChangeCompany} name="threeAToys" />
                                                    }
                                                    label="ThreeA Toys"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={sideshowCollectibles} onChange={handleChangeCompany} name="sideshowCollectibles" />
                                                    }
                                                    label="Sideshow Collectibles"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={hotToys} onChange={handleChangeCompany} name="hotToys" />
                                                    }
                                                    label="Hot Toys"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={ironStudios} onChange={handleChangeCompany} name="ironStudios" />
                                                    }
                                                    label="Iron Studios"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            color: '#d0d2d4',
                                                            '&.Mui-checked': {
                                                                color: '#2c88cc',
                                                            },
                                                        }}
                                                            checked={tweeterhead} onChange={handleChangeCompany} name="tweeterhead" />
                                                    }
                                                    label="Tweeterhead"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="showMore" onClick={handleShowMoreComp}>
                                        {!showMoreComp ? <AddIcon className="icon" /> : <RemoveIcon className="icon" />}
                                        {!showMoreComp ? "Hiện thêm" : "Ẩn bớt"}
                                    </div>
                                </FormGroup>
                            </FormControl>
                        </div>
                    </div>

                </AnimatePresence>
            </div>

            {userStore.isOpenFilter && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="backdrop-background"
                    onClick={() => handleCloseFilter()}
                ></motion.div>
            )}
        </>

    );
}

export default ProductFilters;
