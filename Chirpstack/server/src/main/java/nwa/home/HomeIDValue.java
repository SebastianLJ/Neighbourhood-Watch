package nwa.home;

import java.io.Serializable;
/**
 * Home ID value object
 */
public class HomeIDValue implements HomeID, Serializable
{

	private static final long serialVersionUID = 1511148683557999102L;
	private String id;
	
	public HomeIDValue(String id)
	{
		this.id = id;
	}
	
	
	public String getID()
	{
		return id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		HomeIDValue other = (HomeIDValue) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
