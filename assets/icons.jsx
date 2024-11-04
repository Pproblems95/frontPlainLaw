import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';


export const UserIcon = (props) => (
    <FontAwesome name="user-circle" size={24} color="black" {...props}/>
) 

export const DocumentIcon = (props) => (
    <Entypo name="text-document-inverted" size={24} color="black" {...props} />

)
export const HomeIcon = (props) => (
    <Entypo name="home" size={24} color="black" {...props}/> 
)
export const EditIcon = (props) => (
    <Entypo name="pencil" size={24} color="black" {...props}/>
)
