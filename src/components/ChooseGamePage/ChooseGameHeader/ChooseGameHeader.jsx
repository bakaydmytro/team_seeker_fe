import ProfileButton from '../../Buttons/ProfileButton'
import MoreInfoButton from '../../Buttons/MoreInfoButton'


export default function Header(){
    return(
        <header>
            <a className='logo' href="/">Team Seeker</a>
            <div className="button-block">
                <ProfileButton />
                <MoreInfoButton />
            </div>
        </header>
    )
}
