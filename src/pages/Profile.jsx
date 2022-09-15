import React, { useState } from 'react';

const Profile = () => {
    const major = [
        '경영사무',
        '마케팅·광고·홍보',
        '무역·유통',
        '디자인',
        '영업·고객상담',
        'IT개발·인터넷',
        '전문·특수·연구직',
        '미디어·문화',
        '교육',
        '서비스',
        '연구개발·설계',
        '관광레저서비스',
        '건설·건축',
        '의료',
    ];
    const [selectedMajor, setSelectedMajor] = useState('경영사무');
    console.log(selectedMajor);
    return (
        <div>
            <div>
                <div>닉네임</div>
                <input type='text' />
                <div>3/8</div>
            </div>
            <div>
                <div>연령대</div>
                <button>20대</button>
                <button>30대</button>
                <button>기타</button>
            </div>
            <div>
                <div>전문 분야</div>
                {major.map((select, i) => {
                    return (
                        <>
                            {select === selectedMajor ? (
                                <button
                                    style={{ backgroundColor: 'white' }}
                                    onClick={() => {
                                        setSelectedMajor(select);
                                    }}>
                                    {select}
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setSelectedMajor(select);
                                    }}>
                                    {select}
                                </button>
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Profile;
